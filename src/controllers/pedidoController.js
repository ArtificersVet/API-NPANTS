import paypal from '@paypal/checkout-server-sdk';
import PaypalPayment from '../models/paypalPayment.js';
import Pedido from '../models/pedido.js';
import Cliente from '../models/cliente.js';
import EstadoPedido from '../models/estadopedido.js';
import DetalleProducto from '../models/detalleproducto.js';

function getPayPalClient() {
    const clientId = process.env.PAYPAL_CLIENT_ID?.trim();
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET?.trim();
    
    console.log('PayPal Environment Check:');
    console.log('Client ID length:', clientId?.length);
    console.log('Client Secret length:', clientSecret?.length);
    
    if (!clientId || !clientSecret) {
        throw new Error('PayPal credentials are missing or empty');
    }

    try {
        const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
        const client = new paypal.core.PayPalHttpClient(environment);
        return client;
    } catch (error) {
        console.error('Error creating PayPal client:', error);
        throw error;
    }
}


//Obtener pedidos paginados 
export const PedidoGetAll = async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const limit = Math.max(1, parseInt(pageSize)); // Cantidad de pedidos por página
    const offset = Math.max(0, (parseInt(page) - 1) * limit); // Saltar pedidos según la página

    try {
        const { rows: pedidos } = await Pedido.findAndCountAll({
            include: [
                { model: Cliente, as: 'cliente' },
                { model: EstadoPedido, as: 'estado_pedido' }
            ],
            limit,
            offset
        });

        if (pedidos.length === 0) {
            return res.status(404).json({ message: 'No hay ningún pedido' });
        }

        // Devolver directamente el array de pedidos
        res.json(pedidos);
    } catch (error) {
        console.error('Error al obtener todos los pedidos:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

// Crear pedido con PayPal
// Crear pedido con PayPal
export const PedidoCreate = async (req, res) => {
    try {
        const { detalleproducto, ...pedidoData } = req.body;

        // Crear el pedido en tu base de datos
        const pedido = await Pedido.create({
            fecha_pedido: pedidoData.fecha_pedido,
            saldo: pedidoData.saldo,
            tipo_pago: pedidoData.tipo_pago,
            total: pedidoData.total,  // Asegurarse de usar minúscula
            cliente_id: pedidoData.cliente_id,
            estado_pedido_id: 1 // Pendiente de pago
        });

        // Crear los detalles del pedido
        if (detalleproducto && detalleproducto.length > 0) {
            const detalles = detalleproducto.map(detalle => ({
                PrendaVestirId: detalle.prenda_vestir_id,
                TallaId: detalle.talla_id,
                Cantidad: detalle.cantidad,
                Descripcion: detalle.descripcion,
                Precio: detalle.precio,
                TotalPieza: detalle.total_pieza,
                ConsumoTela: detalle.consumo_tela,
                SubTotal: detalle.sub_total,
                PedidoId: pedido.id
            })).filter(detalle => 
                detalle.PrendaVestirId !== undefined &&
                detalle.TallaId !== undefined &&
                detalle.Cantidad !== undefined &&
                detalle.Precio !== undefined &&
                detalle.TotalPieza !== undefined &&
                detalle.ConsumoTela !== undefined &&
                detalle.SubTotal !== undefined
            );

            await DetalleProducto.bulkCreate(detalles);
        }

        // Crear orden de PayPal
        const client = getPayPalClient();
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: pedido.total.toString() // Usar minúscula
                },
                description: `Pedido #${pedido.id}`
            }],
            application_context: {
                brand_name: 'TuMarca',
                landing_page: 'BILLING',
                user_action: 'PAY_NOW',
                return_url: 'https://tusitio.com/pago-exitoso',
                cancel_url: 'https://tusitio.com/pago-cancelado'
            }
        });

        const order = await client.execute(request);

        // Obtener el enlace de aprobación (approval URL)
        const approvalLink = order.result.links.find(link => link.rel === 'approve').href;

        // Crear registro de pago PayPal
        await PaypalPayment.create({
            paypal_order_id: order.result.id,
            amount: pedido.total, // Usar minúscula
            pedido_id: pedido.id,
            status: 'CREATED',
            additional_data: {
                description: `Pedido #${pedido.id}`,
                create_time: order.result.create_time
            }
        });

        // Responder con el pedido y la URL de aprobación de PayPal
        res.status(201).json({
            pedido,
            paypalOrderId: order.result.id,
            approvalLink // Enlace para redirigir al cliente a PayPal
        });
    } catch (error) {
        console.error('Error al crear pedido con PayPal:', error);
        res.status(500).json({ 
            message: 'Error en el servidor', 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined 
        });
    }
};


// Capturar el pago de PayPal
export const PedidoCapturePayment = async (req, res) => {
    try {
        const { orderID } = req.body;
        const client = getPayPalClient();
        
        const request = new paypal.orders.OrdersCaptureRequest(orderID);
        const capture = await client.execute(request);

        // Actualizar el registro de pago
        const payment = await PaypalPayment.findOne({
            where: { paypal_order_id: orderID }
        });

        if (payment) {
            await payment.update({
                status: 'COMPLETED',
                transaction_id: capture.result.purchase_units[0].payments.captures[0].id,
                payer_email: capture.result.payer.email_address,
                payment_date: new Date(),
                additional_data: {
                    ...payment.additional_data,
                    capture_data: capture.result
                }
            });

            // Actualizar el estado del pedido
            await Pedido.update(
                { estado_pedido_id: 2 }, // Pagado/Confirmado
                { where: { id: payment.pedido_id } }
            );
        }

        res.json({
            status: 'COMPLETED',
            orderID,
            captureID: capture.result.purchase_units[0].payments.captures[0].id
        });
    } catch (error) {
        console.error('Error al capturar pago PayPal:', error);
        res.status(500).json({ message: 'Error al procesar el pago', error: error.message });
    }
};

// Cancelar orden de PayPal
export const PedidoCancelPayment = async (req, res) => {
    try {
        const { orderID } = req.params;
        
        const payment = await PaypalPayment.findOne({
            where: { paypal_order_id: orderID }
        });

        if (payment) {
            await payment.update({
                status: 'CANCELLED',
                additional_data: {
                    ...payment.additional_data,
                    cancelled_at: new Date()
                }
            });

            // Actualizar el estado del pedido
            await Pedido.update(
                { estado_pedido_id: 4 }, // Cancelado
                { where: { id: payment.pedido_id } }
            );
        }

        res.json({ status: 'CANCELLED', orderID });
    } catch (error) {
        console.error('Error al cancelar orden PayPal:', error);
        res.status(500).json({ message: 'Error al cancelar la orden', error: error.message });
    }
};

// Obtener un pedido por su ID con detalles
export const PedidoGetById = async (req, res) => {
    const { id } = req.params;
    try {
        const pedido = await Pedido.findByPk(id, {
            include: [
                { model: Cliente, as: 'cliente' },
                { model: EstadoPedido, as: 'estado_pedido' },
                { model: DetalleProducto, as: 'detalles' }
            ]
        });

        if (!pedido) {
            return res.status(404).json({ message: 'No se encontró el pedido' });
        }

        res.json(pedido);
    } catch (error) {
        console.error('Error al obtener el pedido:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

// Actualizar un pedido
export const PedidoUpdate = async (req, res) => {
    const { id } = req.params;
    try {
        const { detalleproducto, ...pedidoData } = req.body;

        const [affectedRows] = await Pedido.update(pedidoData, { where: { id } });

        if (affectedRows === 0) {
            return res.status(404).json({ message: 'No se encontró el pedido o no se hicieron cambios' });
        }

        if (detalleproducto && detalleproducto.length > 0) {
            await DetalleProducto.destroy({ where: { PedidoId: id } });
            const detalles = detalleproducto.map(detalle => ({
                ...detalle,
                PedidoId: id
            }));
            await DetalleProducto.bulkCreate(detalles);
        }

        res.status(200).json({ message: `Pedido con ID ${id} actualizado correctamente` });
    } catch (error) {
        console.error('Error al actualizar el pedido:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

// Eliminar un pedido
export const PedidoDelete = async (req, res) => {
    const { id } = req.params;
    try {
        await DetalleProducto.destroy({ where: { PedidoId: id } });
        const affectedRows = await Pedido.destroy({ where: { id } });

        if (affectedRows === 0) {
            return res.status(404).json({ message: 'No se encontró el pedido' });
        }

        res.status(200).json({ message: `Pedido con ID ${id} eliminado correctamente` });
    } catch (error) {
        console.error('Error al eliminar el pedido:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};
// 1. Backend (API)
// src/controllers/pagoController.js
import paypal from '@paypal/checkout-server-sdk';
import PaypalPayment from '../models/paypalPayment.js';
import Pedido from '../models/pedido.js';

function getPayPalClient() {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
    return new paypal.core.PayPalHttpClient(environment);
}

export const createPayPalOrder = async (req, res) => {
    try {
        const { pedidoId } = req.body;
        const pedido = await Pedido.findByPk(pedidoId, {
            include: ['detalles']
        });

        if (!pedido) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        const client = getPayPalClient();
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: pedido.Total.toString()
                },
                description: `Pedido #${pedido.id}`
            }]
        });

        const order = await client.execute(request);

        // Crear registro de pago PayPal
        await PaypalPayment.create({
            paypal_order_id: order.result.id,
            amount: pedido.Total,
            pedido_id: pedido.id,
            status: 'CREATED',
            additional_data: {
                description: `Pedido #${pedido.id}`,
                create_time: order.result.create_time
            }
        });

        res.json({
            id: order.result.id
        });
    } catch (error) {
        console.error('Error al crear orden PayPal:', error);
        res.status(500).json({ error: 'Error al procesar el pago' });
    }
};
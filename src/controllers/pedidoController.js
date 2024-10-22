import Pedido from '../models/pedido.js'; // Asegúrate de que la ruta sea correcta
import Cliente from '../models/cliente.js';
import EstadoPedido from '../models/estadopedido.js';
import DetalleProducto from '../models/detalleproducto.js'; // Importamos el modelo de DetalleProducto

// Obtener todos los pedidos con paginación
export const PedidoGetAll = async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const limit = Math.max(1, parseInt(pageSize)); // Cantidad de pedidos por página
    const offset = Math.max(0, (parseInt(page) - 1) * limit); // Saltar pedidos según la página

    try {
        const { count, rows: pedidos } = await Pedido.findAndCountAll({
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

        res.json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            pageSize: limit,
            pedidos
        });
    } catch (error) {
        console.error('Error al obtener todos los pedidos:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};


export const PedidoCreate = async (req, res) => {
    try {
        console.log('PedidoCreate', req.body); // Imprimir el cuerpo de la solicitud
        const { detalleproducto, ...pedidoData } = req.body;

        // Crear el pedido
        const pedido = await Pedido.create(pedidoData);

        // Si hay detalles de productos, validarlos y crearlos
        if (detalleproducto && detalleproducto.length > 0) {
            const detalles = detalleproducto
                .map(detalle => ({
                    PrendaVestirId: detalle.prenda_vestir_id, // Asegúrate que este nombre sea correcto
                    TallaId: detalle.talla_id, // Asegúrate que este nombre sea correcto
                    Cantidad: detalle.cantidad,
                    Descripcion: detalle.descripcion,
                    Precio: detalle.precio,
                    TotalPieza: detalle.total_pieza, // Asegúrate que este nombre sea correcto
                    ConsumoTela: detalle.consumo_tela, // Asegúrate que este nombre sea correcto
                    SubTotal: detalle.sub_total, // Asegúrate que este nombre sea correcto
                    PedidoId: pedido.id // Asociar el ID del pedido a cada detalle
                }))
                .filter(detalle => 
                    detalle.PrendaVestirId !== undefined &&
                    detalle.TallaId !== undefined &&
                    detalle.Cantidad !== undefined &&
                    detalle.Precio !== undefined &&
                    detalle.TotalPieza !== undefined &&
                    detalle.ConsumoTela !== undefined &&
                    detalle.SubTotal !== undefined
                ); // Filtrar detalles válidos

            console.log('Detalles válidos a crear:', detalles); // Log para verificar los detalles

            // Solo crear si hay detalles válidos
            if (detalles.length > 0) {
                await DetalleProducto.bulkCreate(detalles); // Crear múltiples detalles a la vez
                console.log('Detalles creados correctamente.');
            } else {
                console.log('No hay detalles válidos para crear.');
            }
        }

        res.status(201).json(pedido);
    } catch (error) {
        console.error('Error al crear el pedido:', error);
        res.status(500).send('Error en el servidor');
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
                { model: DetalleProducto, as: 'detalles' } // Incluir los detalles del producto
            ]
        });

        if (!pedido) {
            return res.status(404).send('No se encontró el pedido');
        }

        res.json(pedido);
    } catch (error) {
        console.error('Error al obtener el pedido:', error);
        res.status(500).send('Error en el servidor');
    }
};

// Actualizar un pedido por su ID y sus detalles asociados
export const PedidoUpdate = async (req, res) => {
    const { id } = req.params;
    try {
        const { detalleproducto, ...pedidoData } = req.body;

        // Actualizar el pedido principal
        const [affectedRows] = await Pedido.update(pedidoData, { where: { id } });

        if (affectedRows === 0) {
            return res.status(404).send('No se encontró el pedido o no se hicieron cambios');
        }

        // Actualizar o recrear los detalles del pedido
        if (detalleproducto && detalleproducto.length > 0) {
            // Eliminar los detalles existentes y crear los nuevos
            await DetalleProducto.destroy({ where: { PedidoId: id } });
            const detalles = detalleproducto.map(detalle => ({
                ...detalle,
                PedidoId: id // Asociar el ID del pedido a cada detalle
            }));
            await DetalleProducto.bulkCreate(detalles);
        }

        res.status(200).send(`Pedido con ID ${id} actualizado correctamente`);
    } catch (error) {
        console.error('Error al actualizar el pedido:', error);
        res.status(500).send('Error en el servidor');
    }
};

// Eliminar un pedido por su ID y sus detalles asociados
export const PedidoDelete = async (req, res) => {
    const { id } = req.params;
    try {
        // Primero eliminar los detalles asociados al pedido
        await DetalleProducto.destroy({ where: { PedidoId: id } });

        // Luego eliminar el pedido
        const affectedRows = await Pedido.destroy({ where: { id } });

        if (affectedRows === 0) {
            return res.status(404).send('No se encontró el pedido');
        }

        res.status(200).send(`Pedido con ID ${id} eliminado correctamente`);
    } catch (error) {
        console.error('Error al eliminar el pedido:', error);
        res.status(500).send('Error en el servidor');
    }
};

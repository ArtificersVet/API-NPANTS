import Pedido from '../models/pedido.js'; // Asegúrate de que la ruta sea correcta
import Cliente from '../models/cliente.js';
import EstadoPedido from '../models/estadopedido.js';
import DetalleProducto from '../models/detalleproducto.js'; // Importamos el modelo de DetalleProducto

// Obtener todos los pedidos
export const PedidoGetAll = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({
            include: [
                { model: Cliente, as: 'cliente' },
                { model: EstadoPedido, as: 'estado_pedido' }
            ]
        });
        if (pedidos.length === 0) {
            return res.status(404).send('No hay ningún pedido');
        }
        res.json(pedidos);
    } catch (error) {
        console.error('Error al obtener todos los pedidos:', error); // Log detallado
        res.status(500).send('Error en el servidor');
    }
};

export const PedidoCreate = async (req, res) => {
    try {
        const { detalleproducto, ...pedidoData } = req.body;

        // Crear el pedido
        const pedido = await Pedido.create(pedidoData);

        // Si hay detalles de productos, crearlos y asociarlos al pedido
        if (detalleproducto && detalleproducto.length > 0) {
            const detalles = detalleproducto.map(detalle => ({
                PrendaVestirId: detalle.prendaVestirId,
                TallaId: detalle.talla_id,
                Cantidad: detalle.cantidad,
                Descripcion: detalle.descripcion,
                Precio: detalle.precio,
                TotalPieza: detalle.totalPieza,
                ConsumoTela: detalle.consumoTela,
                SubTotal: detalle.subTotal,
                PedidoId: pedido.id // Asociar el ID del pedido a cada detalle
            }));
            console.log('Detalles a crear:', detalles);
            await DetalleProducto.bulkCreate(detalles); // Crear múltiples detalles a la vez
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

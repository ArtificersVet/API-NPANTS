import HistorialPedido from '../models/historialpedido.js'; // Ajusta la ruta si es necesario
// // Ajusta la ruta si es necesario
import Usuario from '../models/usuario.js'; // Ajusta la ruta si es necesario
import EstadoPedido from '../models/estadopedido.js'; // Ajusta la ruta si es necesario

// Obtener todos los historial de pedidos
export const HistorialPedidoGetAll = async(req, res) => {
    try {
        const historialPedidos = await HistorialPedido.findAll({
            include: [
                // { model: Pedido, as: 'pedido' }, // Incluye información del pedido
                { model: Usuario, as: 'usuario' }, // Incluye información del usuario
                { model: EstadoPedido, as: 'estadoPedido' } // Incluye información del estado del pedido
            ]
        });
        if (historialPedidos.length === 0) {
            res.status(404).send('No hay ningún historial de pedidos');
        } else {
            res.json(historialPedidos);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Crear un nuevo historial de pedido
export const HistorialPedidoCreate = async(req, res) => {
    try {
        const historialPedido = await HistorialPedido.create(req.body);
        res.status(201).json(historialPedido);
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Obtener un historial de pedido por su ID
export const HistorialPedidoGetById = async(req, res) => {
    const { id } = req.params;
    try {
        const historialPedido = await HistorialPedido.findByPk(id, {
            include: [
                // { model: Pedido, as: 'pedido' },
                { model: Usuario, as: 'usuario' },
                { model: EstadoPedido, as: 'estadoPedido' }
            ]
        });
        if (!historialPedido) {
            res.status(404).send('No se encontró el historial de pedido');
        } else {
            res.json(historialPedido);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Actualizar un historial de pedido por su ID
export const HistorialPedidoUpdate = async(req, res) => {
    const { id } = req.params;
    try {
        const [affectedRows] = await HistorialPedido.update(req.body, {
            where: { id }
        });

        if (affectedRows === 0) {
            res.status(404).send('No se encontró el historial de pedido o no se hicieron cambios');
        } else {
            res.status(200).send(`Historial de pedido con ID ${id} actualizado correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Eliminar un historial de pedido por su ID
export const HistorialPedidoDelete = async(req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await HistorialPedido.destroy({
            where: { id }
        });

        if (affectedRows === 0) {
            res.status(404).send('No se encontró el historial de pedido');
        } else {
            res.status(200).send(`Historial de pedido con ID ${id} eliminado correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};
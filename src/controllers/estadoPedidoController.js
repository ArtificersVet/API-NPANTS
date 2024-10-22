import EstadoPedido from '../models/estadopedido.js';

// Obtener todos los estados de pedido
export const EstadoPedidoGetAll = async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const limit = Math.max(1, parseInt(pageSize)); // Cantidad de estados por página
    const offset = Math.max(0, (parseInt(page) - 1) * limit); // Saltar estados según la página

    try {
        const { count, rows: estadosPedido } = await EstadoPedido.findAndCountAll({
            limit,
            offset
        });

        if (estadosPedido.length === 0) {
            return res.status(404).json({ message: 'No hay ningún estado de pedido' });
        }

        res.json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            pageSize: limit,
            estadosPedido
        });
    } catch (error) {
        console.error('Error al obtener todos los estados de pedido:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

// Crear un nuevo estado de pedido
export const EstadoPedidoCreate = async(req, res) => {
    try {
        const estadoPedido = await EstadoPedido.create(req.body);
        res.status(201).json(estadoPedido);
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Obtener un estado de pedido por su ID
export const EstadoPedidoGetById = async(req, res) => {
    const { id } = req.params;
    try {
        const estadoPedido = await EstadoPedido.findByPk(id);
        if (!estadoPedido) {
            res.status(404).send('No se encontró el estado de pedido');
        } else {
            res.json(estadoPedido);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Actualizar un estado de pedido por su ID
export const EstadoPedidoUpdate = async(req, res) => {
    const { id } = req.params;
    try {
        const [affectedRows] = await EstadoPedido.update(req.body, { where: { id } });

        if (affectedRows === 0) {
            res.status(404).send('No se encontró el estado de pedido o no se hicieron cambios');
        } else {
            res.status(200).send(`Estado de pedido con ID ${id} actualizado correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Eliminar un estado de pedido por su ID
export const EstadoPedidoDelete = async(req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await EstadoPedido.destroy({ where: { id } });

        if (affectedRows === 0) {
            res.status(404).send('No se encontró el estado de pedido');
        } else {
            res.status(200).send(`Estado de pedido con ID ${id} eliminado correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};
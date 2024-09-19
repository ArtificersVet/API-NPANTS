import EstadoPedido from './src/models/estadopedido.js';

// Obtener todos los estados de pedido
export const EstadoPedidoGetAll = async(req, res) => {
    try {
        const estadosPedido = await EstadoPedido.findAll();
        if (estadosPedido.length === 0) {
            res.status(404).send('No hay ningún estado de pedido');
        } else {
            res.json(estadosPedido);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
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
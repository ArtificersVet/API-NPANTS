import Pedido from '../models/pedido.js'; // Asegúrate de que la ruta sea correcta
import Cliente from '../models/cliente.js';
import EstadoPedido from '../models/estadopedido.js';

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


// Crear un nuevo pedido
export const PedidoCreate = async (req, res) => {
    try {
        const pedido = await Pedido.create(req.body);
        res.status(201).json(pedido);
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Obtener un pedido por su ID
export const PedidoGetById = async (req, res) => {
    const { id } = req.params;
    try {
        const pedido = await Pedido.findByPk(id, {
            include: [
                { model: Cliente, as: 'cliente' },
                { model: EstadoPedido, as: 'estado_pedido' }
            ]
        });
        if (!pedido) {
            return res.status(404).send('No se encontró el pedido');
        }
        res.json(pedido);
    } catch (error) {
        console.error(error); // Ver detalles del error
        res.status(500).send('Error en el servidor');
    }
};

// Actualizar un pedido por su ID
export const PedidoUpdate = async (req, res) => {
    const { id } = req.params;
    try {
        const [affectedRows] = await Pedido.update(req.body, { where: { id } });

        if (affectedRows === 0) {
            res.status(404).send('No se encontró el pedido o no se hicieron cambios');
        } else {
            res.status(200).send(`Pedido con ID ${id} actualizado correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Eliminar un pedido por su ID
export const PedidoDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await Pedido.destroy({ where: { id } });

        if (affectedRows === 0) {
            res.status(404).send('No se encontró el pedido');
        } else {
            res.status(200).send(`Pedido con ID ${id} eliminado correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

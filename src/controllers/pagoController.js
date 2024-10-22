import Pago from '../models/pago.js'; // Ajusta la ruta si es necesario
import MetodoPago from '../models/metodoPago.js'; // Ajusta la ruta si es necesario
import Pedido from '../models/pedido.js';

// Obtener todos los pagos con paginación
export const PagoGetAll = async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const limit = Math.max(1, parseInt(pageSize)); // Cantidad de pagos por página
    const offset = Math.max(0, (parseInt(page) - 1) * limit); // Saltar pagos según la página

    try {
        const { count, rows: pagos } = await Pago.findAndCountAll({
            include: [
                { model: MetodoPago, as: 'metodo_de_pago' }, // Incluye el método de pago
                { model: Pedido, as: 'pedido' } // Incluye el pedido
            ],
            limit,
            offset
        });

        if (pagos.length === 0) {
            return res.status(404).json({ message: 'No hay ningún pago' });
        }

        res.json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            pageSize: limit,
            pagos
        });
    } catch (error) {
        console.error('Error al obtener todos los pagos:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

// Crear un nuevo Pago
export const PagoCreate = async (req, res) => {
    try {
        const { metodo_pago_id, pedido_id, ...pagoData } = req.body;

        const metodoPago = await MetodoPago.findByPk(metodo_pago_id);
        const pedido = await Pedido.findByPk(pedido_id);

        if (!metodoPago) {
            return res.status(404).send('Metodo de Pago no encontrado');
        }
        if (!pedido) {
            return res.status(404).send('Pedido no encontrado');
        }

        const pago = await Pago.create({
            ...pagoData,
            metodo_pago_id: metodoPago.id,
            pedido_id: pedido.id
        });

        res.status(201).json(pago);
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Obtener un Pago por su ID
export const PagoGetById = async (req, res) => {
    const { id } = req.params;
    try {
        const pago = await Pago.findByPk(id, {
            include: [
                { model: MetodoPago, as: 'metodo_de_pago' },
                { model: Pedido, as: 'pedido'}
            ]  
        });
        if (!pago) {
            res.status(404).send('No se encontró el pago');
        } else {
            res.json(pago);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Actualizar un pago por su ID
export const PagoUpdate = async (req, res) => {
    const { id } = req.params;
    try {
        const [affectedRows] = await Pago.update(req.body, {
            where: { id }
        });

        if (affectedRows === 0) {
            res.status(404).send('No se encontró el Pago o no se hicieron cambios');
        } else {
            res.status(200).send(`Pago con ID ${id} actualizado correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Eliminar un Pago por su ID
export const PagoDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await Pago.destroy({
            where: { id }
        });

        if (affectedRows === 0) {
            res.status(404).send('No se encontró el Pago');
        } else {
            res.status(200).send(`Pago con ID ${id} eliminado correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

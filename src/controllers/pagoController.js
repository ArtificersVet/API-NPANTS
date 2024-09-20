import Pago from '../models/pago.js'; // Ajusta la ruta si es necesario
import MetodoPago from '../models/metodoPago.js'; // Ajusta la ruta si es necesario
import Pedido from '../models/pedido.js';
// Obtener todos los Pagos
export const PagoGetAll = async (req, res) => {
    try {
        const pagos = await Pago.findAll({
            include: [
                { model: MetodoPago, as: 'metodo_de_pago' }, // Incluye el método de pago
                { model: Pedido, as: 'pedido' } // Incluye el pedido
            ]
        });
        if (pagos.length === 0) {
            res.status(404).send('No hay ningún Pago');
        } else {
            res.json(pagos);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
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
            include: [{ model: MetodoPago, as: 'metodo de pago' }] // Incluye la información del rol
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

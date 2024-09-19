import MetodoPago from '../models/metodoPago.js'; // Ajusta la ruta si es necesario

// Obtener todos los métodos de pago
export const MetodoPagoGetAll = async (req, res) => {
    try {
        const metodosPago = await MetodoPago.findAll();
        if (metodosPago.length === 0) {
            res.status(404).send('No hay ningún método de pago');
        } else {
            res.json(metodosPago);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Crear un nuevo método de pago
export const MetodoPagoCreate = async (req, res) => {
    try {
        const metodoPago = await MetodoPago.create(req.body);
        res.status(201).json(metodoPago);
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Obtener un método de pago por su ID
export const MetodoPagoGetById = async (req, res) => {
    const { id } = req.params;
    try {
        const metodoPago = await MetodoPago.findByPk(id);
        if (!metodoPago) {
            res.status(404).send('No se encontró el método de pago');
        } else {
            res.json(metodoPago);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Actualizar un método de pago por su ID
export const MetodoPagoUpdate = async (req, res) => {
    const { id } = req.params;
    try {
        const [affectedRows] = await MetodoPago.update(req.body, {
            where: { id }
        });

        if (affectedRows === 0) {
            res.status(404).send('No se encontró el método de pago o no se hicieron cambios');
        } else {
            res.status(200).send(`Método de pago con ID ${id} actualizado correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Eliminar un método de pago por su ID
export const MetodoPagoDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await MetodoPago.destroy({
            where: { id }
        });

        if (affectedRows === 0) {
            res.status(404).send('No se encontró el método de pago');
        } else {
            res.status(200).send(`Método de pago con ID ${id} eliminado correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

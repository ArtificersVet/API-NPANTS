import Talla from '../models/talla.js';

// Obtener todas las tallas
export const TallaGetAll = async (req, res) => {
    try {
        const tallas = await Talla.findAll();
        if (tallas.length === 0) {
            res.status(404).send('No hay ninguna talla');
        } else {
            res.json(tallas);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Crear una nueva talla
export const TallaCreate = async (req, res) => {
    const { nombre } = req.body;

    try {
        // Crear la talla
        const talla = await Talla.create({ nombre });
   
        res.status(201).json(talla);
    } catch (error) {
        console.error('Error durante la creación de talla:', error.message);
        res.status(500).send('Error en el servidor: ' + error.message);
    }
};

// Obtener una talla por ID
export const TallaGetById = async (req, res) => {
    const { id } = req.params;
    try {
        const talla = await Talla.findByPk(id);
        if (!talla) {
            res.status(404).send('No se encontró la talla');
        } else {
            res.json(talla);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Actualizar una talla
export const TallaUpdate = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    try {
        const talla = await Talla.findByPk(id);
        if (!talla) {
            res.status(404).send('No se encontró la talla');
            return;
        }
        await talla.update({ nombre });
        res.status(200).send(`Talla con ID ${id} actualizada correctamente`);
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Eliminar una talla
export const TallaDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await Talla.destroy({ where: { id } });
        if (affectedRows === 0) {
            res.status(404).send('No se encontró la talla');
        } else {
            res.status(200).send(`Talla con ID ${id} eliminada correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

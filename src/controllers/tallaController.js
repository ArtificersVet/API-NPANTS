import Talla from '../models/talla.js';

export const TallaGetAll = async(req, res) => {
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

export const TallaCreate = async(req, res) => {
    try {
        const talla = await Talla.create(req.body);
        res.status(201).json(talla);
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

export const TallaGetById = async(req, res) => {
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

export const TallaUpdate = async(req, res) => {
    const { id } = req.params;
    try {
        const [affectedRows] = await Talla.update(req.body, { where: { id } });

        if (affectedRows === 0) {
            res.status(404).send('No se encontró la talla o no se hicieron cambios');
        } else {
            res.status(200).send(`Talla con ID ${id} actualizada correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

export const TallaDelete = async(req, res) => {
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
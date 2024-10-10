import EstiloTalla from '../models/estilotalla.js'; // Ajusta la ruta si es necesario
import Talla from '../models/talla.js'; // Importar los modelos relacionados
import Estilo from '../models/estilo.js';

// Obtener todas las relaciones estilo-talla
export const EstiloTallaGetAll = async (req, res) => {
    try {
        const estiloTallas = await EstiloTalla.findAll({
            include: [Talla, Estilo] // Incluir los modelos relacionados
        });
        if (estiloTallas.length === 0) {
            res.status(404).send('No hay ninguna relación estilo-talla');
        } else {
            res.json(estiloTallas);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Crear una nueva relación estilo-talla
export const EstiloTallaCreate = async (req, res) => {
    try {
        const estiloTalla = await EstiloTalla.create(req.body);
        res.status(201).json(estiloTalla);
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Obtener una relación estilo-talla por su ID
export const EstiloTallaGetById = async (req, res) => {
    const { id } = req.params;
    try {
        const estiloTalla = await EstiloTalla.findByPk(id, {
            include: [Talla, Estilo] // Incluir los modelos relacionados
        });
        if (!estiloTalla) {
            res.status(404).send('No se encontró la relación estilo-talla');
        } else {
            res.json(estiloTalla);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Actualizar una relación estilo-talla por su ID
export const EstiloTallaUpdate = async (req, res) => {
    const { id } = req.params;
    try {
        const [affectedRows] = await EstiloTalla.update(req.body, {
            where: { id }
        });

        if (affectedRows === 0) {
            res.status(404).send('No se encontró la relación estilo-talla o no se hicieron cambios');
        } else {
            res.status(200).send(`Relación estilo-talla con ID ${id} actualizada correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Eliminar una relación estilo-talla por su ID
export const EstiloTallaDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await EstiloTalla.destroy({
            where: { id }
        });

        if (affectedRows === 0) {
            res.status(404).send('No se encontró la relación estilo-talla');
        } else {
            res.status(200).send(`Relación estilo-talla con ID ${id} eliminada correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

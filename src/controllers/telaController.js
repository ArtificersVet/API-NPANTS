import Tela from '../models/tela.js'; // Ajusta la ruta si es necesario

// Obtener todas las telas
export const TelaGetAll = async (req, res) => {
    try {
        const telas = await Tela.findAll();
        if (telas.length === 0) {
            res.status(404).send('No hay ninguna tela');
        } else {
            res.json(telas);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Crear una nueva tela
export const TelaCreate = async (req, res) => {
    try {
        const tela = await Tela.create(req.body);
        res.status(201).json(tela);
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Obtener una tela por su ID
export const TelaGetById = async (req, res) => {
    const { id } = req.params;
    try {
        const tela = await Tela.findByPk(id);
        if (!tela) {
            res.status(404).send('No se encontró la tela');
        } else {
            res.json(tela);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Actualizar una tela por su ID
export const TelaUpdate = async (req, res) => {
    const { id } = req.params;
    try {
        const [affectedRows] = await Tela.update(req.body, {
            where: { id }
        });

        if (affectedRows === 0) {
            res.status(404).send('No se encontró la tela o no se hicieron cambios');
        } else {
            res.status(200).send(`Tela con ID ${id} actualizada correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Eliminar una tela por su ID
export const TelaDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await Tela.destroy({
            where: { id }
        });

        if (affectedRows === 0) {
            res.status(404).send('No se encontró la tela');
        } else {
            res.status(200).send(`Tela con ID ${id} eliminada correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

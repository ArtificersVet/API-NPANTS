import Tela from '../models/tela.js'; // Ajusta la ruta si es necesario

// Obtener todas las telas
// Obtener todas las telas
export const TelaGetAll = async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const limit = Math.max(1, parseInt(pageSize)); // Cantidad de telas por página
    const offset = Math.max(0, (parseInt(page) - 1) * limit); // Saltar telas según la página

    try {
        const { count, rows: telas } = await Tela.findAndCountAll({
            limit,
            offset
        });

        if (telas.length === 0) {
            return res.status(404).json({ message: 'No hay ninguna tela' });
        }

        res.json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            pageSize: limit,
            telas
        });
    } catch (error) {
        console.error('Error al obtener todas las telas:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
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

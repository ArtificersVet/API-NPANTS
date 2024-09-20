import Estilo from '../models/estilo.js'; // Adjust the path if necessary

 export const EstiloGetAll = async (req, res) => {
    try {
        const Estilos = await Estilo.findAll();
        if (Estilos.length === 0) {
            res.status(404).send('No hay ningún Estilo');
        } else {
            res.json(Estilos);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

 export const EstCreate = async (req, res) => {
    try {
        const estilo = await Estilo.create(req.body);
        res.status(201).json(estilo);
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

 export const EstiloGetById = async (req, res) => {
    const { id } = req.params;
    try {
        const estilo = await Estilo.findByPk(id);
        if (!estilo) {
            res.status(404).send('No se encontró el Estilo');
        } else {
            res.json(estilo);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

 export const EstiloUpdate = async (req, res) => {
    const { id } = req.params;
    try {
        const [affectedRows] = await Estilo.update(req.body, {
            where: { id }
        });

        if (affectedRows === 0) {
            res.status(404).send('No se encontró el Estilo o no se hicieron cambios');
        } else {
            res.status(200).send(`Estilo con ID ${id} actualizado correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

 export const EstiloDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await Estilo.destroy({
            where: { id }
        });

        if (affectedRows === 0) {
            res.status(404).send('No se encontró el Estilo');
        } else {
            res.status(200).send(`Estilo con ID ${id} eliminado correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

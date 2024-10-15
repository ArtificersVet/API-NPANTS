import Estilo from '../models/estilo.js';
import EstiloTalla from '../models/estilotalla.js';
import sequelize from '../config/database.js'; 
import Talla from '../models/talla.js';

// Obtener todos los estilos sin incluir tallas
export const EstiloGetAll = async (req, res) => {
   
    try {
        const estilos = await Estilo.findAll(); // Solo obtener estilos sin incluir relaciones

        if (estilos.length === 0) {
            console.log("No se encontraron estilos");
            res.status(404).send('No hay ningún estilo');
        } else {
            
            res.json(estilos); // Retornar solo los estilos
        }
    } catch (error) {
        console.error("Error al obtener estilos:", error);
        res.status(500).send('Error en el servidor');
    }
};


// Crear un nuevo estilo con asociación a tallas
export const EstCreate = async (req, res) => {
    console.log("Solicitud para crear un nuevo estilo:", req.body);
    const { nombre, tipo, estiloTallas } = req.body; // Cambié estilotalla a estiloTallas
    const transaction = await sequelize.transaction();

    try {
        const newEstilo = await Estilo.create({ nombre, tipo }, { transaction });

        // Verificar si estiloTallas está presente
        if (estiloTallas && Array.isArray(estiloTallas)) {
            const estilosTallas = estiloTallas.map(item => ({
                estilo_id: newEstilo.id, // Asegúrate de usar newEstilo.id
                talla_id: item.tallaId, // Usa la propiedad correcta, asegurando que coincida con tu objeto
                consumoTela: item.consumoTela // Asegúrate de que los nombres coincidan
            }));

            await EstiloTalla.bulkCreate(estilosTallas, { transaction });
        }

        await transaction.commit();
        res.status(201).json({ message: "Estilo creado exitosamente", data: newEstilo });
    } catch (error) {
        await transaction.rollback();
        console.error("Error al crear estilo:", error);
        res.status(500).json({ message: "Error interno del servidor", error });
    }
};


// Obtener un estilo por ID
export const EstiloGetById = async (req, res) => {
    const { id } = req.params;
    console.log(`Solicitud para obtener el estilo con ID: ${id}`);
    try {
        const estilo = await Estilo.findByPk(id, {
            include: [{
                model: EstiloTalla,
                include: [Talla]
            }]
        });
        if (!estilo) {
            console.log(`Estilo con ID ${id} no encontrado`);
            res.status(404).send('No se encontró el estilo');
        } else {
            console.log("Estilo encontrado:", estilo);
            res.json(estilo);
        }
    } catch (error) {
        console.error(`Error al obtener el estilo con ID ${id}:`, error);
        res.status(500).send('Error en el servidor');
    }
};

// Actualizar un estilo y su asociación a tallas
export const EstiloUpdate = async (req, res) => {
    const { id } = req.params;
    const { nombre, tipo, estilotalla } = req.body;
    console.log(`Solicitud para actualizar el estilo con ID: ${id}, datos:`, req.body);
    const transaction = await sequelize.transaction();

    try {
        // Actualizar el estilo
        const estilo = await Estilo.findByPk(id);
        if (!estilo) {
            console.log(`Estilo con ID ${id} no encontrado`);
            res.status(404).send('No se encontró el estilo');
            return;
        }

        await estilo.update({ nombre, tipo }, { transaction });
        console.log(`Estilo con ID ${id} actualizado`);

        // Actualizar asociaciones en EstiloTalla
        await EstiloTalla.destroy({ where: { estilo_id: id }, transaction });
        console.log(`Asociaciones antiguas de EstiloTalla eliminadas para Estilo ID ${id}`);

        if (estilotalla && estilotalla.length > 0) {
            for (const entry of estilotalla) {
                await EstiloTalla.create({
                    estilo_id: id,
                    talla_id: entry.talla_id,
                    consumoTela: entry.consumetela
                }, { transaction });
                console.log(`Nueva asociación EstiloTalla creada para Estilo ID ${id} con Talla ID ${entry.talla_id}`);
            }
        }

        await transaction.commit();
        res.status(200).send(`Estilo con ID ${id} actualizado correctamente`);
    } catch (error) {
        await transaction.rollback();
        console.error(`Error al actualizar el estilo con ID ${id}:`, error);
        res.status(500).send('Error en el servidor');
    }
};

// Eliminar un estilo y sus asociaciones
export const EstiloDelete = async (req, res) => {
    const { id } = req.params;
    console.log(`Solicitud para eliminar el estilo con ID: ${id}`);
    const transaction = await sequelize.transaction();

    try {
        // Eliminar las asociaciones en EstiloTalla
        await EstiloTalla.destroy({ where: { estilo_id: id }, transaction });
        console.log(`Asociaciones de EstiloTalla eliminadas para Estilo ID ${id}`);

        // Eliminar el estilo
        const affectedRows = await Estilo.destroy({
            where: { id },
            transaction
        });

        if (affectedRows === 0) {
            console.log(`No se encontró el estilo con ID ${id}`);
            res.status(404).send('No se encontró el estilo');
        } else {
            await transaction.commit();
            console.log(`Estilo con ID ${id} eliminado correctamente`);
            res.status(200).send(`Estilo con ID ${id} eliminado correctamente`);
        }
    } catch (error) {
        await transaction.rollback();
        console.error(`Error al eliminar el estilo con ID ${id}:`, error);
        res.status(500).send('Error en el servidor');
    }
};

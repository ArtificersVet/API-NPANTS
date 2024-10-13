import Talla from '../models/talla.js';
import EstiloTalla from '../models/estilotalla.js';
import sequelize from '../config/database.js';
import Estilo from '../models/estilo.js';

// Obtener todas las tallas
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

// Crear una nueva talla con estilos asociados
// Crear una nueva talla con estilos asociados
export const TallaCreate = async (req, res) => {
    const { nombre, estilos } = req.body;
    console.log('Datos recibidos para crear talla:', { nombre, estilos });
    const transaction = await sequelize.transaction();

    try {
        // Crear la talla
        const talla = await Talla.create({ nombre }, { transaction });
        console.log('Talla creada:', talla);

        // Crear las entradas en EstiloTalla
        if (estilos && estilos.length > 0) {
            for (const estilo of estilos) {
                // Usar el campo estiloId en lugar de id si este es 0
                const estiloId = estilo.id && estilo.id > 0 ? estilo.id : estilo.estiloId;

                // Verificar que el ID del estilo sea válido
                if (!estiloId || estiloId <= 0) {
                    throw new Error('Estilo ID no proporcionado o no válido');
                }

                // Consultar si el estilo existe
                const estiloExistente = await Estilo.findByPk(estiloId);
                if (!estiloExistente) {
                    throw new Error(`Estilo con ID ${estiloId} no existe`);
                }

                // Crear el registro en la tabla intermedia
                await EstiloTalla.create({
                    talla_id: talla.id, // Correcto
                    estilo_id: estiloId, // Usamos estiloId en lugar de estilo.id
                    consumoTela: estilo.consumoTela
                }, { transaction });

                console.log('EstiloTalla creado para estilo ID:', estiloId);
            }
        }

        await transaction.commit();
        console.log('Transacción completada');
        res.status(201).json(talla);
    } catch (error) {
        await transaction.rollback();
        console.error('Error durante la creación de talla:', error.message);
        res.status(500).send('Error en el servidor: ' + error.message);
    }
};




// Obtener una talla por ID
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

// Actualizar una talla y sus estilos asociados
export const TallaUpdate = async(req, res) => {
    const { id } = req.params;
    const { nombre, estilos } = req.body; // Nuevos datos de la talla y estilos
    const transaction = await sequelize.transaction(); // Transacción para la consistencia

    try {
        // Actualizar la talla
        const talla = await Talla.findByPk(id);
        if (!talla) {
            res.status(404).send('No se encontró la talla');
            return;
        }
        await talla.update({ nombre }, { transaction });

        // Actualizar estilos
        // Primero eliminamos los estilos anteriores relacionados con la talla
        await EstiloTalla.destroy({ where: { tallaId: id }, transaction });

        // Insertamos los nuevos estilos
        if (estilos && estilos.length > 0) {
            for (const estilo of estilos) {
                await EstiloTalla.create({
                    tallaId: id,
                    estiloId: estilo.id,
                    consumoTela: estilo.consumoTela
                }, { transaction });
            }
        }

        await transaction.commit();
        res.status(200).send(`Talla con ID ${id} actualizada correctamente`);
    } catch (error) {
        await transaction.rollback();
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Eliminar una talla
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

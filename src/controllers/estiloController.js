import Estilo from '../models/estilo.js';
import EstiloTalla from '../models/estilotalla.js';
import Talla from '../models/talla.js';
import sequelize from '../config/database.js';

// Obtener todos los estilos con sus tallas asociadas
export const getEstilos = async (req, res) => {
  try {
    const estilos = await Estilo.findAll({
      include: [
        {
          model: EstiloTalla,
          as: 'tallas',
          include: [
            {
              model: Talla,
              as: 'talla'
            }
          ]
        }
      ]
    });
    res.json(estilos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un estilo por ID con sus tallas asociadas
export const getEstiloById = async (req, res) => {
  const { id } = req.params;

  try {
    const estilo = await Estilo.findByPk(id, {
      include: [
        {
          model: EstiloTalla,
          as: 'tallas',
          include: [
            {
              model: Talla,
              as: 'talla'
            }
          ]
        }
      ]
    });

    if (!estilo) {
      return res.status(404).json({ error: 'Estilo no encontrado' });
    }

    res.json(estilo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo estilo con sus tallas asociadas
export const createEstilo = async (req, res) => {
  const { nombre, tipo, tallas } = req.body;

  try {
    const result = await sequelize.transaction(async (t) => {
      // Validación de datos
      if (!nombre || !tipo) {
        throw new Error('Nombre y tipo son obligatorios.');
      }

      // Crear el Estilo (maestro)
      const estilo = await Estilo.create({ nombre, tipo }, { transaction: t });

      // Verificar si hay tallas para asociar
      if (tallas && tallas.length > 0) {
        // Validación de datos de tallas
        for (const talla of tallas) {
          if (!talla.consumoTela || talla.consumoTela <= 0 || !talla.talla_id) {
            throw new Error('Datos de talla inválidos.');
          }
        }

        // Crear los detalles de EstiloTalla
        const estiloTallas = tallas.map(t => ({
          consumoTela: t.consumoTela,
          estilo_id: estilo.id,
          talla_id: t.talla_id
        }));
        await EstiloTalla.bulkCreate(estiloTallas, { transaction: t });
      }

      // Recuperar el Estilo con las tallas asociadas
      const estiloConTallas = await Estilo.findByPk(estilo.id, {
        include: [
          {
            model: EstiloTalla,
            as: 'tallas',
            include: [
              {
                model: Talla,
                as: 'talla'
              }
            ]
          }
        ],
        transaction: t
      });

      return estiloConTallas;
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un estilo y sus tallas asociadas
export const updateEstilo = async (req, res) => {
  const { id } = req.params;
  const { nombre, tipo, tallas } = req.body;

  try {
    await sequelize.transaction(async (t) => {
      // Buscar el estilo por ID
      const estilo = await Estilo.findByPk(id, { transaction: t });
      if (!estilo) {
        throw new Error('Estilo no encontrado'); 
      }

      // Validación de datos
      if (!nombre || !tipo) {
        throw new Error('Nombre y tipo son obligatorios.');
      }

      // Actualizar los datos del estilo (maestro)
      estilo.nombre = nombre;
      estilo.tipo = tipo;
      await estilo.save({ transaction: t });

      // Actualizar los detalles de tallas (detalle)
      if (tallas && tallas.length > 0) {
        // Validación de datos de tallas
        for (const talla of tallas) {
          if (!talla.consumoTela || talla.consumoTela <= 0 || !talla.talla_id) {
            throw new Error('Datos de talla inválidos.');
          }
        }

        // Obtener las tallas existentes
        const tallasExistentes = await EstiloTalla.findAll({ where: { estilo_id: id }, transaction: t });

        // Iterar sobre las tallas nuevas
        for (const nuevaTalla of tallas) {
          // Buscar si la talla ya existe
          const tallaExistente = tallasExistentes.find(t => t.talla_id === nuevaTalla.talla_id);

          if (tallaExistente) {
            // Actualizar la talla existente
            tallaExistente.consumoTela = nuevaTalla.consumoTela;
            await tallaExistente.save({ transaction: t });
          } else {
            // Crear una nueva talla
            await EstiloTalla.create({
              consumoTela: nuevaTalla.consumoTela,
              estilo_id: id,
              talla_id: nuevaTalla.talla_id
            }, { transaction: t });
          }
        }

        // Eliminar las tallas que ya no están presentes
        for (const tallaExistente of tallasExistentes) {
          if (!tallas.find(t => t.talla_id === tallaExistente.talla_id)) {
            await tallaExistente.destroy({ transaction: t });
          }
        }
      }
    });

    // Devolver el estilo actualizado junto con los detalles
    const estiloActualizado = await Estilo.findByPk(id, {
      include: [{ model: EstiloTalla, as: 'tallas', include: ['talla'] }]
    });
    res.json(estiloActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un estilo y sus tallas asociadas
export const deleteEstilo = async (req, res) => {
  const { id } = req.params;

  try {
    await sequelize.transaction(async (t) => {
      // Eliminar los detalles asociados primero
      await EstiloTalla.destroy({ where: { estilo_id: id }, transaction: t });

      // Eliminar el estilo
      const result = await Estilo.destroy({ where: { id }, transaction: t });
      if (!result) {
        throw new Error('Estilo no encontrado'); 
      }
    });

    res.json({ message: 'Estilo eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
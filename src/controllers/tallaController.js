import Talla from '../models/talla.js';

export const TallaGetAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
        const limit = parseInt(req.query.limit) || 10; // Elementos por página, por defecto 10
        
        // Calcular el offset
        const offset = (page - 1) * limit;
        
        // Realizar la consulta paginada
        const { count, rows: tallas } = await Talla.findAndCountAll({
            limit,
            offset,
            order: [['id', 'ASC']] // Ordenar por ID de forma ascendente
        });
        
        // Calcular el total de páginas
        const totalPages = Math.ceil(count / limit);
        
        if (tallas.length === 0) {
            res.status(404).json({
                message: 'No hay ninguna talla',
                data: [],
                pagination: {
                    totalItems: count,
                    totalPages: totalPages,
                    currentPage: page,
                    itemsPerPage: limit
                }
            });
        } else {
            // Devolver resultados con información de paginación
            res.json({
                data: tallas,
                pagination: {
                    totalItems: count,
                    totalPages: totalPages,
                    currentPage: page,
                    itemsPerPage: limit,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1
                }
            });
        }
    } catch (error) {
        console.error('Error al obtener tallas:', error);
        res.status(500).json({
            message: 'Error en el servidor',
            error: error.message
        });
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

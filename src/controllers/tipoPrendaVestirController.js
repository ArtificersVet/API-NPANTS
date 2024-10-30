import TipoPrendaVestir from '../models/tipoPrendaVestir.js'; // Adjust the path if necessary

// Obtener todos los tipos de prendas de vestir
export const TipoPrendaVestirGetAll = async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const limit = Math.max(1, parseInt(pageSize)); // Cantidad de tipos de prendas por página
    const offset = Math.max(0, (parseInt(page) - 1) * limit); // Saltar tipos de prendas según la página

    try {
        const { count, rows: tiposPrendaVestir } = await TipoPrendaVestir.findAndCountAll({
            limit,
            offset
        });

        if (tiposPrendaVestir.length === 0) {
            return res.status(404).json({ message: 'No hay ningún tipo de prenda de vestir' });
        }

        res.json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            pageSize: limit,
            tiposPrendaVestir
        });
    } catch (error) {
        console.error('Error al obtener todos los tipos de prendas de vestir:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

// Crear un nuevo tipoprenda
export const TipoPrendaVestirCreate = async (req, res) => {
    try {
        const tipoprendasvestir = await TipoPrendaVestir.create(req.body);
        res.status(201).json(tipoprendasvestir);
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Obtener un tipocliente por su ID
export const TipoPrendaVestirGetById = async (req, res) => {
    const { id } = req.params;
    try {
        const tipoprendasvestir = await TipoPrendaVestir.findByPk(id);
        if (!tipoprendasvestir) {
            res.status(404).send('No se encontró el tipo prendas');
        } else {
            res.json(tipoprendasvestir);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Actualizar un tipocliente por su ID
export const TipoPrendaVestirUpdate = async (req, res) => {
    const { id } = req.params;
    try {
        const [affectedRows] = await TipoPrendaVestir.update(req.body, {
            where: { id }
        });

        if (affectedRows === 0) {
            res.status(404).send('No se encontró el tipo prenda o no se hicieron cambios');
        } else {
            res.status(200).send(`Tipo prenda con ID ${id} actualizado correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Eliminar un tipocliente por su ID
export const TipoPrendaVestirDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await TipoPrendaVestir.destroy({
            where: { id }
        });

        if (affectedRows === 0) {
            res.status(404).send('No se encontró el tipo prenda');
        } else {
            res.status(200).send(`Tipo prenda vestir con ID ${id} eliminado correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

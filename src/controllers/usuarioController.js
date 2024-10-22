import Usuario from '../models/usuario.js'; // Ajusta la ruta si es necesario
import Rol from '../models/rol.js'; // Ajusta la ruta si es necesario

// Obtener todos los usuarios con paginación
export const UsuarioGetAll = async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;

    const limit = Math.max(1, parseInt(pageSize)); // Cantidad de usuarios por página
    const offset = Math.max(0, (parseInt(page) - 1) * limit); // Saltar usuarios según la página

    try {
        const { count, rows: usuarios } = await Usuario.findAndCountAll({
            include: [{ model: Rol, as: 'rol' }],
            limit,
            offset
        });

        if (usuarios.length === 0) {
            return res.status(404).json({ message: 'No hay ningún usuario' });
        }

        res.json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            pageSize: limit,
            usuarios
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};


// Crear un nuevo usuario
export const UsuarioCreate = async (req, res) => {
    try {
        const usuario = await Usuario.create(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Obtener un usuario por su ID
export const UsuarioGetById = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id, {
            include: [{ model: Rol, as: 'rol' }] // Incluye la información del rol
        });
        if (!usuario) {
            res.status(404).send('No se encontró el usuario');
        } else {
            res.json(usuario);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Actualizar un usuario por su ID
export const UsuarioUpdate = async (req, res) => {
    const { id } = req.params;
    try {
        const [affectedRows] = await Usuario.update(req.body, {
            where: { id }
        });

        if (affectedRows === 0) {
            res.status(404).send('No se encontró el usuario o no se hicieron cambios');
        } else {
            res.status(200).send(`Usuario con ID ${id} actualizado correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Eliminar un usuario por su ID
export const UsuarioDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await Usuario.destroy({
            where: { id }
        });

        if (affectedRows === 0) {
            res.status(404).send('No se encontró el usuario');
        } else {
            res.status(200).send(`Usuario con ID ${id} eliminado correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

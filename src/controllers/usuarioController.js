import Usuario from '../models/usuario.js'; // Ajusta la ruta si es necesario
import Rol from '../models/rol.js'; // Ajusta la ruta si es necesario

// Obtener todos los usuarios
export const UsuarioGetAll = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            include: [{ model: Rol, as: 'rol' }] // Incluye la información del rol
        });
        if (usuarios.length === 0) {
            res.status(404).send('No hay ningún usuario');
        } else {
            res.json(usuarios);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
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

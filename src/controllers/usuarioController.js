import { pool } from "../config/database.js";

// Obtener todos los usuarios
export const UsuarioGetAll = async (req, res) => {
    try {
        const [usuarios] = await pool.query('SELECT usuarios.*, roles.nombre AS rol FROM usuarios LEFT JOIN roles ON usuarios.rol_id = roles.id');
        if (usuarios.length == 0) {
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
    const { nombre, email, password, rol_id } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO usuarios (nombre, email, password, rol_id) VALUES (?, ?, ?, ?)',
            [nombre, email, password, rol_id]
        );

        if (result.affectedRows == 0) {
            res.status(400).send('No se pudo crear el usuario');
        } else {
            res.status(201).json({ id: result.insertId, nombre, email, rol_id });
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Obtener un usuario por su ID
export const UsuarioGetById = async (req, res) => {
    const { id } = req.params;
    try {
        const [usuario] = await pool.query(
            'SELECT usuarios.*, roles.nombre AS rol FROM usuarios LEFT JOIN roles ON usuarios.rol_id = roles.id WHERE usuarios.id = ?',
            [id]
        );

        if (usuario.length == 0) {
            res.status(404).send('No se encontró el usuario');
        } else {
            res.json(usuario[0]);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Actualizar un usuario por su ID
export const UsuarioUpdate = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, password, rol_id } = req.body;

    try {
        const [result] = await pool.query(
            'UPDATE usuarios SET nombre = ?, email = ?, password = ?, rol_id = ? WHERE id = ?',
            [nombre, email, password, rol_id, id]
        );

        if (result.affectedRows == 0) {
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
        const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);

        if (result.affectedRows == 0) {
            res.status(404).send('No se encontró el usuario');
        } else {
            res.status(200).send(`Usuario con ID ${id} eliminado correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

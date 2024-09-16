import { pool } from "../config/database.js";

// Obtener todos los roles
export const RolGetAll = async (req, res) => {
    try {
        const [roles] = await pool.query('SELECT * FROM roles');
        if (roles.length == 0) {
            res.status(404).send('No hay ningún rol');
        } else {
            res.json(roles);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Crear un nuevo rol
export const RolCreate = async (req, res) => {
    const { nombre, descripcion } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO roles (nombre, descripcion) VALUES (?, ?)',
            [nombre, descripcion]
        );

        if (result.affectedRows == 0) {
            res.status(400).send('No se pudo crear el rol');
        } else {
            res.status(201).json({ id: result.insertId, nombre, descripcion });
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Obtener un rol por su ID
export const RolGetById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rol] = await pool.query('SELECT * FROM roles WHERE id = ?', [id]);

        if (rol.length == 0) {
            res.status(404).send('No se encontró el rol');
        } else {
            res.json(rol[0]);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Actualizar un rol por su ID
export const RolUpdate = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    try {
        const [result] = await pool.query(
            'UPDATE roles SET nombre = ?, descripcion = ? WHERE id = ?',
            [nombre, descripcion, id]
        );

        if (result.affectedRows == 0) {
            res.status(404).send('No se encontró el rol o no se hicieron cambios');
        } else {
            res.status(200).send(`Rol con ID ${id} actualizado correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};


// Eliminar un rol por su ID
export const RolDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM roles WHERE id = ?', [id]);

        if (result.affectedRows == 0) {
            res.status(404).send('No se encontró el rol');
        } else {
            res.status(200).send(`Rol con ID ${id} eliminado correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

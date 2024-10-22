import Rol from '../models/rol.js'; // Adjust the path if necessary

// Obtener todos los roles con paginación
export const RolGetAll = async (req, res) => {
    try {
        const roles = await Rol.findAll();
        if (roles.length === 0) {
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
    try {
        const rol = await Rol.create(req.body);
        res.status(201).json(rol);
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Obtener un rol por su ID
export const RolGetById = async (req, res) => {
    const { id } = req.params;
    try {
        const rol = await Rol.findByPk(id);
        if (!rol) {
            res.status(404).send('No se encontró el rol');
        } else {
            res.json(rol);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Actualizar un rol por su ID
export const RolUpdate = async (req, res) => {
    const { id } = req.params;
    try {
        const [affectedRows] = await Rol.update(req.body, {
            where: { id }
        });

        if (affectedRows === 0) {
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
        const affectedRows = await Rol.destroy({
            where: { id }
        });

        if (affectedRows === 0) {
            res.status(404).send('No se encontró el rol');
        } else {
            res.status(200).send(`Rol con ID ${id} eliminado correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

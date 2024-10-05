import TipoCliente from '../models/tipoCliente.js'; // Adjust the path if necessary

// Obtener todos los tipoclientes
export const TipoClienteGetAll = async (req, res) => {
    try { 
        console.log("cualquier cosa");
        const tipoclientes = await TipoCliente.findAll();
        if (tipoclientes.length === 0) {
            res.status(404).send('No hay ningún tipo cliente');
        } else {
            res.json(tipoclientes);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Crear asaber un nuevo tipocliente
export const TipoClienteCreate = async (req, res) => {
    try {
        const tipoCliente = await TipoCliente.create(req.body);
        res.status(201).json(tipoCliente);
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Obtener un tipocliente por su ID
export const TipoClienteGetById = async (req, res) => {
    const { id } = req.params;
    try {
        const tipoCliente = await TipoCliente.findByPk(id);
        if (!tipoCliente) {
            res.status(404).send('No se encontró el tipocliente');
        } else {
            res.json(tipoCliente);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Actualizar un tipocliente por su ID
export const TipoClienteUpdate = async (req, res) => {
    const { id } = req.params;
    try {
        const [affectedRows] = await TipoCliente.update(req.body, {
            where: { id }
        });

        if (affectedRows === 0) {
            res.status(404).send('No se encontró el tipo cliente o no se hicieron cambios');
        } else {
            res.status(200).send(`Tipo_Cliente con ID ${id} actualizado correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Eliminar un tipocliente por su ID
export const TipoClienteDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await TipoCliente.destroy({
            where: { id }
        });

        if (affectedRows === 0) {
            res.status(404).send('No se encontró el tipo cliente');
        } else {
            res.status(200).send(`Tipo_cliente con ID ${id} eliminado correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

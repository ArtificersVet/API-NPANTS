import TipoCliente from '../models/tipoCliente.js'; // Adjust the path if necessary

// Obtener todos los tipos de clientes
export const TipoClienteGetAll = async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const limit = Math.max(1, parseInt(pageSize)); // Cantidad de tipos de clientes por página
    const offset = Math.max(0, (parseInt(page) - 1) * limit); // Saltar tipos de clientes según la página

    try {
        const { rows: tipoclientes } = await TipoCliente.findAndCountAll({
            limit,
            offset
        });

        if (tipoclientes.length === 0) {
            return res.status(404).json({ message: 'No hay ningún tipo cliente' });
        }

        // Devolver directamente el array de tipoclientes
        res.json(tipoclientes);
    } catch (error) {
        console.error('Error al obtener todos los tipos de clientes:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
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

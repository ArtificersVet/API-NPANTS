import Cliente from '../models/cliente.js';
import TipoCliente from '../models/tipoCliente.js';


// Obtener todos los clientes
export const ClienteGetAll = async (req, res) => {
    try {
        const clientes = await Cliente.findAll({
            include: [{ model: TipoCliente, as: 'tipo_cliente' }] 
        });
        if (clientes.length === 0) {
            res.status(404).send('No hay ningún cliente');
        } else {
            res.json(clientes);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Crear un nuevo cliente
export const ClienteCreate = async (req, res) => {
    try {
        const { tipoClienteId, ...clienteData } = req.body; // Separa el ID de TipoCliente del resto de los datos
        const cliente = await Cliente.create({
            ...clienteData,
            tipoClienteId  // Asigna el tipo de cliente al cliente
        });
        res.status(201).json(cliente);
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Obtener un cliente por su ID
export const ClienteGetById = async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await Cliente.findByPk(id, {
            include: [{ model: TipoCliente, as: 'tipo_cliente' }] 
        });
        if (!cliente) {
            res.status(404).send('No se encontró el cliente');
        } else {
            res.json(cliente);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Actualizar un cliente por su ID
export const ClienteUpdate = async (req, res) => {
    const { id } = req.params;
    const { tipoClienteId, ...clienteData } = req.body;
    try {
        const [affectedRows] = await Cliente.update(
            {
                ...clienteData,
                tipoClienteId  // Actualiza el tipo de cliente del cliente
            },
            { where: { id } }
        );

        if (affectedRows === 0) {
            res.status(404).send('No se encontró el cliente o no se hicieron cambios');
        } else {
            res.status(200).send(`Cliente con ID ${id} actualizado correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Eliminar un cliente por su ID
export const ClienteDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await Cliente.destroy({
            where: { id }
        });

        if (affectedRows === 0) {
            res.status(404).send('No se encontró el cliente');
        } else {
            res.status(200).send(`Cliente con ID ${id} eliminado correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};
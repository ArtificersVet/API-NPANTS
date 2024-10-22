import Cliente from '../models/cliente.js';
import TipoCliente from '../models/tipoCliente.js';


// Obtener todos los clientes
export const ClienteGetAll = async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const limit = Math.max(1, parseInt(pageSize)); // Cantidad de clientes por página
    const offset = Math.max(0, (parseInt(page) - 1) * limit); // Saltar clientes según la página

    try {
        const { count, rows: clientes } = await Cliente.findAndCountAll({
            include: [{ model: TipoCliente, as: 'tipo_cliente' }],
            limit,
            offset
        });

        if (clientes.length === 0) {
            return res.status(404).json({ message: 'No hay ningún cliente' });
        }

        res.json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            pageSize: limit,
            clientes
        });
    } catch (error) {
        console.error('Error al obtener todos los clientes:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
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
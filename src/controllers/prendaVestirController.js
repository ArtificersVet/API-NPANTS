import PrendaVestir from '../models/prendaVestir.js';
import Tela from '../models/tela.js';
import Estilo from '../models/estilo.js';
import TipoPrendaVestir from '../models/tipoPrendaVestir.js';

// Obtener todas las prendas de vestir
export const PrendasGetAll = async (req, res) => {
    try {
        const prendas = await PrendaVestir.findAll({
            include: [
                { model: Tela, as: 'tela' },
                { model: Estilo, as: 'estilo' },
                { model: TipoPrendaVestir, as: 'tipoPrendaVestir' }
            ]
        });
        if (prendas.length === 0) {
            res.status(404).send('No hay ninguna prenda de vestir');
        } else {
            res.json(prendas);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Crear una nueva prenda de vestir
export const PrendasCreate = async (req, res) => {
    const { tela_id, estilo_id, tipoprendavestir_id, ...prendaData } = req.body;

    try {
        const prenda = await PrendaVestir.create({
            ...prendaData,
            tela_id, // Asigna el ID de tela
            estilo_id, // Asigna el ID de estilo
            tipoprendavestir_id // Asigna el ID de tipo de prenda
        });
        res.status(201).json(prenda);
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Obtener una prenda de vestir por su ID
export const PrendaGetById = async (req, res) => {
    const { id } = req.params;
    try {
        const prenda = await PrendaVestir.findByPk(id, {
            include: [
                { model: Tela, as: 'tela' },
                { model: Estilo, as: 'estilo' },
                { model: TipoPrendaVestir, as: 'tipoPrendaVestir' }
            ]
        });
        if (!prenda) {
            res.status(404).send('No se encontró la prenda de vestir');
        } else {
            res.json(prenda);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Actualizar una prenda de vestir por su ID
export const PrendaUpdate = async (req, res) => {
    const { id } = req.params;
    const { tela_id, estilo_id, tipoprendavestir_id, ...prendaData } = req.body;

    try {
        const [affectedRows] = await PrendaVestir.update(
            {
                ...prendaData,
                tela_id, // Actualiza el ID de tela
                estilo_id, // Actualiza el ID de estilo
                tipoprendavestir_id // Actualiza el ID de tipo de prenda
            },
            { where: { id } }
        );

        if (affectedRows === 0) {
            res.status(404).send('No se encontró la prenda de vestir o no se hicieron cambios');
        } else {
            res.status(200).send(`Prenda de vestir con ID ${id} actualizada correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};

// Eliminar una prenda de vestir por su ID
export const PrendaDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await PrendaVestir.destroy({
            where: { id }
        });

        if (affectedRows === 0) {
            res.status(404).send('No se encontró la prenda de vestir');
        } else {
            res.status(200).send(`Prenda de vestir con ID ${id} eliminada correctamente`);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error(error);
    }
};


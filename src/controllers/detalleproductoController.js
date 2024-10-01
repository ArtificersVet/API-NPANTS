 import DetalleProducto from '../models/detalleproducto.js';
 import Pedido from '../models/pedido.js';
 import Talla from '../models/talla.js';
 import PrendaVestir from '../models/prendaVestir.js';

 export const createDetalleProducto = async (req, res) => {
    try {
        const { PedidoId, PrendaVestirId, TallaId, Cantidad, Descripcion,
             Precio, TotalPieza, ConsumoTela, SubTotal } = req.body;
        
        const nuevoDetalleProducto = await DetalleProducto.create({
            PedidoId,
            PrendaVestirId,
            TallaId,
            Cantidad,
            Descripcion,
            Precio,
            TotalPieza,
            ConsumoTela,
            SubTotal
        });

        res.status(201).json(nuevoDetalleProducto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear DetalleProducto' });
    }
};

export const getDetalleProductoById = async (req, res) => {
    const { id } = req.params;

    try {
        const detalleProducto = await DetalleProducto.findByPk(id, {
            include: [
                { model: Pedido, as: 'pedido' },
                { model: PrendaVestir, as: 'prendaVestir' },
                { model: Talla, as: 'talla' }
            ]
        });

        if (!detalleProducto) {
            return res.status(404).json({ message: 'DetalleProducto no encontrado' });
        }
        else{

            res.json(detalleProducto);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al buscar DetalleProducto' });
    }
};

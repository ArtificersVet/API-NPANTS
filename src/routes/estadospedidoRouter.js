import express from 'express';
import {
    EstadoPedidoCreate,
    EstadoPedidoGetAll,
    EstadoPedidoGetById,
    EstadoPedidoUpdate,
    EstadoPedidoDelete
} from '../controllers/estadoPedidoController.js';

const router = express.Router();

// Endpoints para estados de pedido
router.get('/estadospedido', EstadoPedidoGetAll);
router.post('/estadospedido/create', EstadoPedidoCreate);
router.get('/estadospedido/:id', EstadoPedidoGetById);
router.put('/estadospedido/:id', EstadoPedidoUpdate);
router.delete('/estadospedido/:id', EstadoPedidoDelete);

export default router;
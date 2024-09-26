import express from 'express';
import {
    EstadoPedidoCreate,
    EstadoPedidoGetAll,
    EstadoPedidoGetById,
    EstadoPedidoUpdate,
    EstadoPedidoDelete
} from '../controllers/estadoPedidoController.js';
import { verifyToken } from '../middlewares/authJwt.js'; // Ahora es verifyToken


const router = express.Router();

// Endpoints para estados de pedido
router.get('/estadospedido', verifyToken, EstadoPedidoGetAll);
router.post('/estadospedido/create', verifyToken, EstadoPedidoCreate);
router.get('/estadospedido/:id', verifyToken, EstadoPedidoGetById);
router.put('/estadospedido/:id', verifyToken, EstadoPedidoUpdate);
router.delete('/estadospedido/:id', verifyToken, EstadoPedidoDelete);

export default router;
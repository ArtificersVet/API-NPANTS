import express from 'express';
import {
    PedidoCreate,
    PedidoGetAll,
    PedidoGetById,
    PedidoUpdate,
    PedidoDelete,
    PedidoCapturePayment,
    PedidoCancelPayment
} from '../controllers/pedidoController.js';

const router = express.Router();

// Endpoints para pedidos
router.get('/pedidos', PedidoGetAll);
router.post('/pedidos/create', PedidoCreate);
router.get('/pedidos/:id', PedidoGetById);
router.put('/pedidos/:id', PedidoUpdate);
router.delete('/pedidos/:id', PedidoDelete);

// Endpoints para PayPal
router.post('/pedidos/capture-payment', PedidoCapturePayment);
router.post('/pedidos/:id/cancel-payment', PedidoCancelPayment);

export default router;
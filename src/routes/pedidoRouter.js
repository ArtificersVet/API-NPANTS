import express from 'express';
import {
    PedidoCreate,
    PedidoGetAll,
    PedidoGetById,
    PedidoUpdate,
    PedidoDelete
} from '../controllers/pedidoController.js'; // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Endpoints para pedidos
router.get('/pedidos', PedidoGetAll);
router.post('/pedidos/create', PedidoCreate);
router.get('/pedidos/:id', PedidoGetById);
router.put('/pedidos/:id', PedidoUpdate);
router.delete('/pedidos/:id', PedidoDelete);

export default router;

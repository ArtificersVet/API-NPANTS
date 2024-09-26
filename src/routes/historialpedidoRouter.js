import express from 'express';
import {
    HistorialPedidoGetAll,
    HistorialPedidoCreate,
    HistorialPedidoGetById,
    HistorialPedidoUpdate,
    HistorialPedidoDelete
} from '../controllers/historialPedidoController.js'; // Asegúrate de que la ruta sea correcta
import { verifyToken } from '../middlewares/authJwt.js'; // Ahora es verifyToken


const router = express.Router();

// Endpoints para historial de pedidos
router.get('/historialpedidos', verifyToken, HistorialPedidoGetAll);
router.post('/historialpedidos/create', verifyToken, HistorialPedidoCreate);
router.get('/historialpedidos/:id', verifyToken, HistorialPedidoGetById);
router.put('/historialpedidos/:id', verifyToken, HistorialPedidoUpdate);
router.delete('/historialpedidos/:id', verifyToken, HistorialPedidoDelete);

export default router; // Exportar como módulo ES
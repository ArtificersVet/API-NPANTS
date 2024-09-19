import express from 'express';
import { 
    HistorialPedidoGetAll, 
    HistorialPedidoCreate, 
    HistorialPedidoGetById, 
    HistorialPedidoUpdate, 
    HistorialPedidoDelete 
} from '../controllers/historialPedidoController.js'; // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Endpoints para historial de pedidos
router.get('/historialpedidos', HistorialPedidoGetAll);
router.post('/historialpedidos/create', HistorialPedidoCreate);
router.get('/historialpedidos/:id', HistorialPedidoGetById);
router.put('/historialpedidos/:id', HistorialPedidoUpdate);
router.delete('/historialpedidos/:id', HistorialPedidoDelete);

export default router; // Exportar como módulo ES
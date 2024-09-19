import express from 'express';
import { 
    MetodoPagoGetAll, 
    MetodoPagoCreate, 
    MetodoPagoGetById, 
    MetodoPagoUpdate, 
    MetodoPagoDelete 
} from '../controllers/metodoPagoController.js'; // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Endpoints para métodos de pago
router.get('/metodospago', MetodoPagoGetAll);
router.post('/metodospago/create', MetodoPagoCreate);
router.get('/metodospago/:id', MetodoPagoGetById);
router.put('/metodospago/:id', MetodoPagoUpdate);
router.delete('/metodospago/:id', MetodoPagoDelete);

export default router; // Exportar como módulo ES

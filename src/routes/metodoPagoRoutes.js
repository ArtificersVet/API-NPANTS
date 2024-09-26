import express from 'express';
import {
    MetodoPagoGetAll,
    MetodoPagoCreate,
    MetodoPagoGetById,
    MetodoPagoUpdate,
    MetodoPagoDelete
} from '../controllers/metodoPagoController.js'; // Asegúrate de que la ruta sea correcta
import { verifyToken } from '../middlewares/authJwt.js'; // Ahora es verifyToken


const router = express.Router();

// Endpoints para métodos de pago
router.get('/metodospago', verifyToken, MetodoPagoGetAll);
router.post('/metodospago/create', verifyToken, MetodoPagoCreate);
router.get('/metodospago/:id', verifyToken, MetodoPagoGetById);
router.put('/metodospago/:id', verifyToken, MetodoPagoUpdate);
router.delete('/metodospago/:id', verifyToken, MetodoPagoDelete);

export default router; // Exportar como módulo ES
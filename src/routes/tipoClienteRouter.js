import express from 'express';
import { TipoClienteCreate, TipoClienteGetAll, TipoClienteGetById, TipoClienteUpdate, TipoClienteDelete } from '../controllers/tipoClienteController.js'; // Ensure the path is correct
import { verifyToken } from '../middlewares/authJwt.js'; // Ahora es verifyToken


const router = express.Router();

// Endpoints para tipoclientes
router.get('/tipoclientes', verifyToken, TipoClienteGetAll);
router.post('/tipoclientes/create', verifyToken, TipoClienteCreate);
router.get('/tipoclientes/:id', verifyToken, TipoClienteGetById);
router.put('/tipoclientes/:id', verifyToken, TipoClienteUpdate);
router.delete('/tipoclientes/:id', verifyToken, TipoClienteDelete);

export default router; // Export as ES module
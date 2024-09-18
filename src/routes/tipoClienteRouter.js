import express from 'express';
import { TipoClienteCreate, TipoClienteGetAll, TipoClienteGetById, TipoClienteUpdate, TipoClienteDelete } from '../controllers/tipoClienteController.js'; // Ensure the path is correct

const router = express.Router();

// Endpoints para tipoclientes
router.get('/tipoclientes', TipoClienteGetAll);
router.post('/tipoclientes/create', TipoClienteCreate);
router.get('/tipoclientes/:id', TipoClienteGetById);
router.put('/tipoclientes/:id', TipoClienteUpdate);
router.delete('/tipoclientes/:id', TipoClienteDelete);

export default router; // Export as ES module
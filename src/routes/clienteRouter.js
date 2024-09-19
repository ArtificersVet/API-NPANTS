import express from 'express';
import { 
    ClienteCreate, 
    ClienteGetAll, 
    ClienteGetById, 
    ClienteUpdate, 
    ClienteDelete } 
    from '../controllers/clienteController.js';

const router = express.Router();

// Endpoints para clientes
router.get('/clientes', ClienteGetAll);
router.post('/clientes/create', ClienteCreate);
router.get('/clientes/:id', ClienteGetById);
router.put('/clientes/:id', ClienteUpdate);
router.delete('/clientes/:id', ClienteDelete);

export default router;

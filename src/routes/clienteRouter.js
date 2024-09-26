import express from 'express';
import {
    ClienteCreate,
    ClienteGetAll,
    ClienteGetById,
    ClienteUpdate,
    ClienteDelete
}
from '../controllers/clienteController.js';
import { verifyToken } from '../middlewares/authJwt.js'; // Ahora es verifyToken


const router = express.Router();

// Endpoints para clientes
router.get('/clientes', verifyToken, ClienteGetAll);
router.post('/clientes/create', verifyToken, ClienteCreate);
router.get('/clientes/:id', verifyToken, ClienteGetById);
router.put('/clientes/:id', verifyToken, ClienteUpdate);
router.delete('/clientes/:id', verifyToken, ClienteDelete);

export default router;
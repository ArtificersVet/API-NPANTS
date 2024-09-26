import express from 'express';
import {
    PrendasGetAll,
    PrendasCreate,
    PrendaUpdate,
    PrendaDelete,
    PrendaGetById
} from '../controllers/prendaVestirController.js';
import { verifyToken } from '../middlewares/authJwt.js'; // Ahora es verifyToken


const router = express.Router();

// Endpoints para prendas
router.get('/prendas', verifyToken, PrendasGetAll);
router.post('/prendas/create', verifyToken, PrendasCreate);
router.get('/prendas/:id', verifyToken, PrendaGetById);
router.put('/prendas/:id', verifyToken, PrendaUpdate);
router.delete('/prendas/:id', verifyToken, PrendaDelete);

export default router;
import express from 'express';
import {
    TallaCreate,
    TallaGetAll,
    getTallas,
    TallaGetById,
    TallaUpdate,
    TallaDelete
} from '../controllers/tallaController.js';
import { verifyToken } from '../middlewares/authJwt.js'; // Ahora es verifyToken


const router = express.Router();

// Endpoints para tallas
router.get('/tallas', TallaGetAll);
router.get('/talla', getTallas );
router.post('/tallas/create', verifyToken, TallaCreate);
router.get('/tallas/:id', verifyToken, TallaGetById);
router.put('/tallas/:id', verifyToken, TallaUpdate);
router.delete('/tallas/:id', verifyToken, TallaDelete);

export default router;
import express from 'express';
import {
    TallaCreate,
    TallaGetAll,
    TallaGetById,
    TallaUpdate,
    TallaDelete
} from '../controllers/tallaController.js';

const router = express.Router();

// Endpoints para tallas
router.get('/tallas', TallaGetAll);
router.post('/tallas/create', TallaCreate);
router.get('/tallas/:id', TallaGetById);
router.put('/tallas/:id', TallaUpdate);
router.delete('/tallas/:id', TallaDelete);

export default router;
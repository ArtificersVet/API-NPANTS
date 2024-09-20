import express from 'express';
import { EstCreate, EstiloDelete, EstiloGetAll, EstiloGetById, EstiloUpdate } from '../controllers/estiloController.js';
import { verifyToken } from '../middlewares/authJwt.js'; // Ahora es verifyToken

const router = express.Router();

router.get('/estilos', verifyToken, EstiloGetAll);
router.post('/estilos/create', verifyToken, EstCreate);
router.get('/estilos/:id', verifyToken, EstiloGetById);
router.put('/estilos/:id', verifyToken, EstiloUpdate);
router.delete('/estilos/:id', verifyToken, EstiloDelete);

export default router;
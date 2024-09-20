import express from 'express';
import { EstCreate, EstiloDelete, EstiloGetAll, EstiloGetById, EstiloUpdate } from '../controllers/estiloController.js';
const router = express.Router();

router.get('/estilos', EstiloGetAll);
router.post('/estilos/create', EstCreate);
router.get('/estilos/:id', EstiloGetById);
router.put('/estilos/:id', EstiloUpdate);
router.delete('/estilos/:id', EstiloDelete);

export default router;
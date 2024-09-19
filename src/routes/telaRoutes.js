import express from 'express';
import { TelaGetAll, TelaCreate, TelaGetById, TelaUpdate, TelaDelete } from '../controllers/telaController.js'; // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Endpoints para tela
router.get('/telas', TelaGetAll);
router.post('/telas/create', TelaCreate);
router.get('/telas/:id', TelaGetById);
router.put('/telas/:id', TelaUpdate);
router.delete('/telas/:id', TelaDelete);

export default router;

import express from 'express';
import { TelaGetAll, TelaCreate, TelaGetById, TelaUpdate, TelaDelete } from '../controllers/telaController.js'; // Asegúrate de que la ruta sea correcta
import { verifyToken } from '../middlewares/authJwt.js'; // Ahora es verifyToken


const router = express.Router();

// Endpoints para tela
router.get('/telas', verifyToken, TelaGetAll);
router.post('/telas/create', verifyToken, TelaCreate);
router.get('/telas/:id', verifyToken, TelaGetById);
router.put('/telas/:id', verifyToken, TelaUpdate);
router.delete('/telas/:id', verifyToken, TelaDelete);

export default router;
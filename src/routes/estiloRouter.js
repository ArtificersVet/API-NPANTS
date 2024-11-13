import express from 'express';
import { getEstilos, getEstiloById, createEstilo, updateEstilo, deleteEstilo } from '../controllers/estiloController.js';
import { verifyToken } from '../middlewares/authJwt.js'; // Ahora es verifyToken

const router = express.Router();

router.get('/estilos', getEstilos);
router.get('/estilos/:id', getEstiloById);  // Ruta para buscar estilo por ID
router.post('/estilos/create', createEstilo);
router.put('/estilos/:id', updateEstilo);
router.delete('/estilos/:id', deleteEstilo);

export default router;
import express from 'express';
import { 
    EstiloTallaGetAll, 
    EstiloTallaCreate, 
    EstiloTallaGetById, 
    EstiloTallaUpdate, 
    EstiloTallaDelete 
} from '../controllers/estilotallaController.js';
import { verifyToken } from '../middlewares/authJwt.js'; // Ahora es verifyToken

const router = express.Router();

router.get('/estilotallas', verifyToken, EstiloTallaGetAll);
router.post('/estilotallas/create', verifyToken, EstiloTallaCreate);
router.get('/estilotallas/:id', verifyToken, EstiloTallaGetById);
router.put('/estilotallas/:id', verifyToken, EstiloTallaUpdate);
router.delete('/estilotallas/:id', verifyToken, EstiloTallaDelete);

export default router;

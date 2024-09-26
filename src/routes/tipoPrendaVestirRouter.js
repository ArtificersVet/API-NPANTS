import express from 'express';
import { TipoPrendaVestirCreate, TipoPrendaVestirGetAll, TipoPrendaVestirGetById, TipoPrendaVestirUpdate, TipoPrendaVestirDelete } from '../controllers/tipoPrendaVestirController.js'; // Ensure the path is correct
import { verifyToken } from '../middlewares/authJwt.js'; // Ahora es verifyToken


const router = express.Router();

// Endpoints para tipoclientes
router.get('/tipoprendasvestir', verifyToken, TipoPrendaVestirGetAll);
router.post('/tipoprendasvestir/create', verifyToken, TipoPrendaVestirCreate);
router.get('/tipoprendasvestir/:id', verifyToken, TipoPrendaVestirGetById);
router.put('/tipoprendasvestir/:id', verifyToken, TipoPrendaVestirUpdate);
router.delete('/tipoprendasvestir/:id', verifyToken, TipoPrendaVestirDelete);

export default router; // Export as ES module
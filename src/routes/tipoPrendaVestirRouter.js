import express from 'express';
import { TipoPrendaVestirCreate, TipoPrendaVestirGetAll, TipoPrendaVestirGetById, TipoPrendaVestirUpdate, TipoPrendaVestirDelete } from '../controllers/tipoPrendaVestirController.js'; // Ensure the path is correct

const router = express.Router();

// Endpoints para tipoclientes
router.get('/tipoprendasvestir', TipoPrendaVestirGetAll);
router.post('/tipoprendasvestir/create', TipoPrendaVestirCreate);
router.get('/tipoprendasvestir/:id', TipoPrendaVestirGetById);
router.put('/tipoprendasvestir/:id', TipoPrendaVestirUpdate);
router.delete('/tipoprendasvestir/:id', TipoPrendaVestirDelete);

export default router; // Export as ES module
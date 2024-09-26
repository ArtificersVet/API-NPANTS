import express from 'express';
import { RolCreate, RolGetAll, RolGetById, RolUpdate, RolDelete } from '../controllers/rolController.js'; // Ensure the path is correct
import { verifyToken } from '../middlewares/authJwt.js'; // Ahora es verifyToken


const router = express.Router();

// Endpoints para roles
router.get('/roles', verifyToken, RolGetAll);
router.post('/roles/create', verifyToken, RolCreate);
router.get('/roles/:id', verifyToken, RolGetById);
router.put('/roles/:id', verifyToken, RolUpdate);
router.delete('/roles/:id', verifyToken, RolDelete);

export default router; // Export as ES module
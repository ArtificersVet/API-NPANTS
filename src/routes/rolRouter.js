import express from 'express';
import { RolCreate, RolGetAll, RolGetById, RolUpdate, RolDelete } from '../controllers/rolController.js'; // Ensure the path is correct

const router = express.Router();

// Endpoints para roles
router.get('/roles', RolGetAll);
router.post('/roles/create', RolCreate);
router.get('/roles/:id', RolGetById);
router.put('/roles/:id', RolUpdate);
router.delete('/roles/:id', RolDelete);

export default router; // Export as ES module

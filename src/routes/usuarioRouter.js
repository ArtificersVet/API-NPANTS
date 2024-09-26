import express from 'express';
import {
    UsuarioGetAll,
    UsuarioCreate,
    UsuarioGetById,
    UsuarioUpdate,
    UsuarioDelete
} from '../controllers/usuarioController.js';
import { verifyToken } from '../middlewares/authJwt.js'; // Ahora es verifyToken

const router = express.Router();

// Ruta para crear usuario (NO requiere autorización)
router.post('/usuarios/create', verifyToken, UsuarioCreate);

// Rutas que requieren autorización
router.get('/usuarios', verifyToken, UsuarioGetAll); // Requiere autenticación
router.get('/usuarios/:id', verifyToken, UsuarioGetById); // Requiere autenticación
router.put('/usuarios/:id', verifyToken, UsuarioUpdate); // Requiere autenticación
router.delete('/usuarios/:id', verifyToken, UsuarioDelete); // Requiere autenticación

export default router;
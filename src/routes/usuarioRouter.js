import express from 'express';
import {
    UsuarioGetAll,
    UsuarioCreate,
    UsuarioGetById,
    UsuarioUpdate,
    UsuarioDelete
} from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/usuarios', UsuarioGetAll);
router.post('/usuarios/create', UsuarioCreate);
router.get('/usuarios/:id', UsuarioGetById);
router.put('/usuarios/:id', UsuarioUpdate);
router.delete('/usuarios/:id', UsuarioDelete);

export default router;

import { Router } from "express";
import { UsuarioCreate,UsuarioGetAll,UsuarioGetById,UsuarioUpdate,UsuarioDelete} from "../controllers/usuarioController.js";

const router = Router();

// Endpoints para usuario
router.get('/usuario', UsuarioGetAll);
router.post('/usuario/create', UsuarioCreate);
router.get('/usuario/:id', UsuarioGetById);
router.put('/usuario/:id', UsuarioUpdate);
router.delete('/usuario/:id', UsuarioDelete);

export default router;
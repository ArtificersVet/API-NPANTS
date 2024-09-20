import express from 'express';
import {
  PrendasGetAll,
  PrendasCreate,
  PrendaUpdate,
  PrendaDelete,
  PrendaGetById
} from '../controllers/prendaVestirController.js';

const router = express.Router();

// Endpoints para prendas
router.get('/prendas', PrendasGetAll);
router.post('/prendas/create', PrendasCreate);
router.get('/prendas/:id', PrendaGetById);
router.put('/prendas/:id', PrendaUpdate);
router.delete('/prendas/:id', PrendaDelete);

export default router;

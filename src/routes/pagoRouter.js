import express from 'express';
import { 
  PagoGetAll, 
  PagoCreate, 
  PagoGetById, 
  PagoUpdate, 
  PagoDelete 
} from '../controllers/pagoController.js';
import { verifyToken } from '../middlewares/authJwt.js';  

const router = express.Router();

 router.post('/pagos/create',verifyToken, PagoCreate);

// Rutas que requieren autorización
router.get('/pagos',verifyToken,  PagoGetAll);  
router.get('/pagos/:id',verifyToken,  PagoGetById);  
router.put('/pagos/:id',verifyToken,  PagoUpdate);  
router.delete('/pagos/:id',verifyToken,  PagoDelete); 

export default router;
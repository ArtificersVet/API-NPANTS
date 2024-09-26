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

 router.post('/pagos/create', PagoCreate);

// Rutas que requieren autorización
router.get('/pagos',  PagoGetAll);  
router.get('/pagos/:id',  PagoGetById);  
router.put('/pagos/:id',  PagoUpdate);  
router.delete('/pagos/:id',  PagoDelete); 

export default router;
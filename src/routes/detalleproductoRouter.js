import express from 'express';
import {  
    createDetalleProducto, 
    getDetalleProductoById, 
} from '../controllers/detalleproductoController.js';
import { verifyToken } from '../middlewares/authJwt.js';  
import { get } from 'mongoose';

const router = express.Router();

router.post('/detalleProducto/create', createDetalleProducto);
router.get('/detalleProducto/:id',  getDetalleProductoById);  

export default router;
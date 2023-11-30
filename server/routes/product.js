import express from 'express';
import {
     createProduct,
     deleteProduct,
     getAllProducts,
     getProductById,
     updateProduct } from '../controller/product.js';
import { verifyToken } from '../middleware/authm.js';

const router = express.Router();

router.get('/products', verifyToken, getAllProducts);
router.get('/products/:id/mode', getProductById);
router.post('/products', verifyToken, createProduct);
router.put('/products/:id', verifyToken, updateProduct);
router.delete('/products/:id', verifyToken, deleteProduct);



export default router;
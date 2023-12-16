import express from 'express';
import {
     createProduct,
     deleteProduct,
     getAllProducts,
     getProductById,
     updateProduct } from '../controller/product.js';
import { verifyToken } from '../middleware/authm.js';
import { validateCreateProduct, validateUpdateProduct } from '../utils/productvalidation.js';
const router = express.Router();

router.get('/products', verifyToken, getAllProducts);
router.get('/products/:id', verifyToken, getProductById);
router.post('/products', verifyToken, validateCreateProduct, createProduct);
router.put('/products/:id', verifyToken, validateUpdateProduct, updateProduct);
router.delete('/products/:id', verifyToken, deleteProduct);



export default router;
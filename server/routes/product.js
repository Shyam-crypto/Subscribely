import express from 'express';
import {
     createProduct,
     deleteProduct,
     getAllProducts,
     getProductById,
     updateProduct } from '../controller/product.js';
import { verifyToken } from '../middleware/authm.js';
import { validateCreateProduct, validateUpdateProduct } from '../utils/productvalidation.js';
import {upload} from '../services/imageupload.js';
const router = express.Router();

router.get('/getallproducts', verifyToken, getAllProducts);
router.get('/getproduct/:id', getProductById);
router.post('/createproduct', verifyToken,upload.single('image'), validateCreateProduct, createProduct);
router.put('/updateproduct/:id', verifyToken, validateUpdateProduct, updateProduct);
router.delete('/deleteproduct/:id', verifyToken, deleteProduct);



export default router;
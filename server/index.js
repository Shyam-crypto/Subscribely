dotenv.config();
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './database/connection.js';
import userRoutes from './routes/userRoutes.js'
import Product from './models/Product.js';

const port = process.env.PORT || 4000;

connectDB();
const app = express();

try {
app.listen(port, () => console.log(`Server started on port ${port}`));
} catch (error) {
    console.error("connection failed");
}
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());
app.use('/api/users', userRoutes);
app.use('/r')
app.post('/product', createProductValidationRules, ProductController.createProduct);
app.get('/product', ProductController.getAllProducts);
app.get('/product/:productId', ProductController.getProductById);
app.put('/product/:productId', updateProductValidationRules, ProductController.updateProduct);
app.delete('/product/:productId', ProductController.deleteProduct);

app.get('/', (req, res) => res.send('server is ready'));

app.use(notFound);
app.use(errorHandler);
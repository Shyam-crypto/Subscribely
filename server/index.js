import express from 'express';
import mongoose from 'mongoose';

// Import your route modules
import productRoutes from './routes/Product';
import userRoutes from './routes/userRoutes';

const app = express();

// JSON middleware
app.use(express.json());

// Connect to your MongoDB 
mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Start the Express server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

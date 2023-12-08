import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => uuidv4(), 
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: String,
  price: {
    type: Number,
    required: true,
  },
  intervals: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema,  );

export default Product;

import { validationResult } from "express-validator";
import Product from "../models/product.js";


const createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description, image, price, intervals } = req.body;
  const owner = req.user.userId;

  try {
    if (!name || !description || !price || !intervals) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const newProduct = new Product({ name, description, image, price, intervals, owner });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Error creating product' });
  }
};

const updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { id } = req.params;
  const { name, description, image, price, intervals } = req.body;

  console.log('ID:', id);
  try {
    const validIntervals = ['weekly', 'monthly', 'annualy'];

    if (intervals && !validIntervals.includes(intervals)) {
      return res.status(400).json({ error: 'Invalid value for intervals' });
    }
    
    if (!name || !description || !price || !intervals) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }
    
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      { name, description, image, price, intervals },
      { new: true });

      console.log('Updated product:', updatedProduct);
    if (updatedProduct) {
      if (updatedProduct.owner.toString() === req.user.userId) {
        return res.status(200).json(updatedProduct);
      } else {
        return res.status(403).json({ error: 'Access denied. User does not own the product.' });
      }
    } else {
      return res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ error: 'Error updating product' });
  }
};

// Delete a product 
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findOneAndDelete({ _id: id });

    if (deletedProduct) {
      
      if (deletedProduct.owner.toString() === req.user.userId) {
        return res.status(200).json(deletedProduct);
      } else {
        return res.status(403).json({ error: 'Access denied. User does not own the product.' });
      }
    } else {
      return res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting product' });
  }
};

// Get all products by user ID
const getAllProducts = async (req, res) => {
    const userId = req.user.userId; 
  
    try {
      const products = await Product.find({ owner: userId });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products by user ID' });
    }
  };

// get product by id
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const product = await Product.findById({ _id: id});

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.owner.toString() === userId) {
      return res.status(200).json({ product, mode: 'read-write' });
    } else {
      return res.status(200).json({ product, mode: 'read-only' });
    }
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return res.status(500).json({ error: 'Error fetching product by ID' });
  }
};


  

  export {
      getAllProducts,
      getProductById, 
      createProduct, 
      updateProduct, 
      deleteProduct 
    };
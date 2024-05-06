import { validationResult } from "express-validator";
import Product from "../models/product.js";
import { uploadFileToS3 } from "../services/imageupload.js"; 
import jwt from 'jsonwebtoken';


const createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description, price, intervals } = req.body;
  const owner = req.user.userId;

  try {
    if (!name || !description || !price || !intervals) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
  }


    const file = req.file;
    const imageUrl = await uploadFileToS3(req.file, 'services');

    const newProduct = new Product({
       name,
       description, 
       image: imageUrl, 
       price, 
       intervals, 
       owner });
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
  const { name, description,price, intervals } = req.body;

  console.log('ID:', id);
  try {
    if (!name || !description || !price || !intervals) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    if(!req.file) {
      return res.status(400).json({error:'Image is required'});
    }

    const file = req.file;
    const imageUrl = await uploadFileToS3(req.file, 'services');

    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      { name,
        description, 
        image: imageUrl, 
        price, 
        intervals },
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
    const product = await Product.findById(id);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    
    if (product.owner.toString() !== req.user.userId) {
       return res.status(403).json({ error: 'Access denied. User does not own the product.' });
    }
    
    await Product.findByIdAndDelete(id);
  
    return res.status(200).send(true);
      
  } catch (error) {
    console.error('Error creating product', error);
    return res.status(500).json({ error: 'Error deleting product' });
  }
};

// get product by id
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const token = req.header('Authorization');
    let mode = 'read-only';

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        mode = 'read-write';
      } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ error: 'Invalid token' });
      }
    }

    const product = await Product.findById({ _id: id });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const productWithMode = { ...product.toObject(), mode };

    return res.status(200).json(productWithMode);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return res.status(500).json({ error: 'Error fetching product by ID' });
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

  export {
      getAllProducts,
      getProductById, 
      createProduct, 
      updateProduct, 
      deleteProduct 
    };
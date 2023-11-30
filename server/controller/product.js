import product from "../models/product.js";

// Get all products by user ID
const getAllProducts = async (req, res) => {
    const userId = req.user._id; 
  
    try {
      const products = await product.find({ owner: userId });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products by user ID' });
    }
  };

// get product by id
const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await product.findOne({ id });

        if (!product) {
            return res.status(404).json({ error: 'product not found'});
        }

        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({error: 'Access denied. No token provided.'});
        }

        try{

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.userId;

            //compareing userId with product owner
            if (product.owner.toString() === userId) {
            
                return res.status(200).json({ product, mode: 'read-write'});
            } else {
                return res.status(403).json({ error: 'Access denied. User does not own a product'});

            }
        }catch (error) {
            return res.status(401).json({ error: 'Invalid token'});
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching product'});
    }
};

//new prod
const createProduct = async (req, res) => {
    const { name, description, image, price, intervals } = req.body;
    const owner = req.user._id;
  
    try {
      const newProduct = new product({ name, description, image, price, intervals, owner });
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: 'Error creating product' });
    }
  };

// Update a product
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, image, price, intervals } = req.body;
  
    try {
      const updatedProduct = await product.findOneAndUpdate({ id }, { name, description, image, price, intervals }, { new: true });
  
      if (updatedProduct) {
        // Check if the user has ownership of the updated product
        if (updatedProduct.owner.toString() === req.user._id) {
          return res.status(200).json(updatedProduct);
        } else {
          return res.status(403).json({ error: 'Access denied. User does not own the product.' });
        }
      } else {
        return res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Error updating product' });
    }
  };
  

// Delete a product 
const deleteProduct = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedProduct = await product.findOneAndDelete({ id });
  
      if (deletedProduct) {
        // Check if the user has ownership of the deleted product
        if (deletedProduct.owner.toString() === req.user._id) {
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
  

  export {
      getAllProducts,
      getProductById, 
      createProduct, 
      updateProduct, 
      deleteProduct 
    };
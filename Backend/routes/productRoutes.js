import express from 'express';
import Product from '../models/Product.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Add new product
router.post('/add-product', async (req, res) => {
  try {
    const authToken = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

    // Create product with exact fields from your form
    const product = new Product({
      title: req.body.title,
      brand: req.body.brand,
      imageUrls: req.body.imageUrls,
      originalPrice: req.body.originalPrice,
      discountedPrice: req.body.discountedPrice,
      category: req.body.category,
      subcategory: req.body.subcategory,
      quantity: req.body.quantity,
      description: req.body.description,
      highlights: req.body.highlights,
      stockAlert: req.body.stockAlert,
      user: decoded.id
    });

    const savedProduct = await product.save();
    res.status(201).json({ message: 'Product added successfully', product: savedProduct });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
});

// Get user's products
router.get('/my-products', async (req, res) => {
  try {
    const authToken = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

    const products = await Product.find({ user: decoded.id });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    // console.log('Products being sent:', products);
    res.json(products);
  } catch (error) {
    // console.error('Error in /products route:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// Get product by ID
router.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});

// Update product
router.put('/product/:id', async (req, res) => {
  try {
    const {
      title,
      brand,
      imageUrls,
      originalPrice,
      discountedPrice,
      category,
      subcategory,
      quantity,
      size,
      description,
      material,
      weight,
      dimensions,
      manufacturingDate,
      warranty,
      shippingInfo,
      highlights,
      stockAlert
    } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        title,
        brand,
        imageUrls,
        originalPrice,
        discountedPrice,
        category,
        subcategory,
        quantity,
        size,
        description,
        material,
        weight,
        dimensions,
        manufacturingDate: manufacturingDate ? new Date(manufacturingDate) : undefined,
        warranty,
        shippingInfo,
        highlights,
        stockAlert
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});

// Delete product
router.delete('/delete-product/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

// Get products by category
router.get('/products/category/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// Get products by subcategory
router.get('/products/subcategory/:subcategory', async (req, res) => {
  try {
    const products = await Product.find({ subcategory: req.params.subcategory });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

export default router;
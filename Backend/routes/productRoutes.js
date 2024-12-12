import express from 'express';
import { Product } from '../models/Product.js';
const router = express.Router();

// Add a new product
router.post('/add-product', async (req, res) => {
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

    // Basic validation
    if (!title || !brand || !imageUrls || !originalPrice || !discountedPrice ||
      !category || !subcategory || !quantity || !description || !stockAlert) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    // Create new product
    const product = new Product({
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
    });

    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    // console.error('Error adding product:', error);
    res.status(500).json({ message: 'Error adding product', error: error.message });
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
router.put('/update-product/:id', async (req, res) => {
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
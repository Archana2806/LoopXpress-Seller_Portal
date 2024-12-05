import express from 'express';
import Product from '../models/product.js';
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
      stockAlert,
    } = req.body;

    // Validate imageUrls
    if (!Array.isArray(imageUrls) || imageUrls.length !== 4) {
      return res.status(400).json({
        success: false,
        message: 'Product must have exactly 4 image URLs'
      });
    }

    // Create new product
    const product = new Product({
      title,
      brand,
      imageUrls,
      originalPrice: Number(originalPrice),
      discountedPrice: Number(discountedPrice),
      category,
      subcategory,
      quantity: Number(quantity),
      size,
      description,
      material,
      weight,
      dimensions,
      manufacturingDate: manufacturingDate ? new Date(manufacturingDate) : undefined,
      warranty,
      shippingInfo,
      highlights: highlights || [],
      stockAlert: Number(stockAlert),
    });

    // Save the product
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      product
    });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to add product',
      error: error.message
    });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product', error: error.message });
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
});

export default router;
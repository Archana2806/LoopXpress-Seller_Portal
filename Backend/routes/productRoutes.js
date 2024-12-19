import express from 'express';
import Product from '../models/Product.js';
import verifyAuth from '../middleware/verifyAuth.js';


const router = express.Router();

// Add new product
router.post('/add-product', verifyAuth, async (req, res) => {
  try {
    // The auth token is already verified by the middleware
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
      user: req.user.id  // Use user from the verified token
    });

    const savedProduct = await product.save();
    res.status(201).json({ message: 'Product added successfully', product: savedProduct });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
});

// Get user's products
router.get('/my-products', verifyAuth, async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.id });
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
    res.json(products);
  } catch (error) {
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

// Update product by ID
router.put('/update-product/:id', verifyAuth, async (req, res) => {
  try {
    console.log('Request received to update product with ID:', req.params.id);  // Log the ID

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      console.log('Product not found');
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});

// Delete product by ID
router.delete('/product/:id', verifyAuth, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

export default router;

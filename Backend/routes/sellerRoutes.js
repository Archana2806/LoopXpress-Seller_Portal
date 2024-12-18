import express from 'express';
import Seller from '../models/Seller.js';
import { Product } from '../models/Product.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();


// Add product (protected route)
router.post('/add-product', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    const seller = await Seller.findById(decoded.id);
    
    if (!seller) return res.status(404).json({ message: 'Seller not found' });

    const product = new Product({
      ...req.body,
      seller: seller._id,
      sellerName: seller.name,
      sellerEmail: seller.email
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get seller's products
router.get('/products', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    const products = await Product.find({ seller: decoded.id });
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

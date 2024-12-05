const express = require('express');
const Product = require('../models/Product'); // Assuming the schema is saved in models/Product.js
const router = express.Router();

// Route to add a new product
router.post('/add-product', async (req, res) => {
  try {
    const {
      title,
      brand,
      originalPrice,
      discountedPrice,
      category,
      quantity,
      size,
      description,
    } = req.body;

    const newProduct = new Product({
      title,
      brand,
      originalPrice,
      discountedPrice,
      category,
      quantity,
      size,
      description,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save product', error: error.message });
  }
});

module.exports = router;

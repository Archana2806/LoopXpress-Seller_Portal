import express from 'express';
import Product from '../models/Product.js';
import verifyAuth from '../middleware/verifyAuth.js';
import upload from '../middleware/upload.js';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

// Add new product
router.post('/add-product', verifyAuth, upload.array('images', 5), async (req, res) => {
  try {
    // Upload images to Cloudinary
    const uploadPromises = req.files.map(file => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'products',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );

        uploadStream.end(file.buffer);
      });
    });

    const imageUrls = await Promise.all(uploadPromises);

    const product = new Product({
      title: req.body.title,
      brand: req.body.brand,
      imageUrls: imageUrls, // Now using Cloudinary URLs
      originalPrice: req.body.originalPrice,
      discountedPrice: req.body.discountedPrice,
      category: req.body.category,
      subcategory: req.body.subcategory,
      quantity: req.body.quantity,
      description: req.body.description,
      highlights: req.body.highlights,
      stockAlert: req.body.stockAlert,
      user: req.user.id,
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
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
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

    // Optional: Ensure image URLs are correctly processed (e.g., Base64 or static URLs)
    if (product.imageUrls && Array.isArray(product.imageUrls)) {
      product.imageUrls = product.imageUrls.map((url) => {
        return url.startsWith('blob:') ? processBlobUrl(url) : url;
      });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});

// Update product by ID
router.put('/update-product/:id', verifyAuth, upload.array('images', 5), async (req, res) => {
  try {
    // Handle new image uploads if any
    let newImageUrls = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'products' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          );
          uploadStream.end(file.buffer);
        });
      });
      newImageUrls = await Promise.all(uploadPromises);
    }

    // Parse existing image URLs from the request
    const existingImageUrls = JSON.parse(req.body.existingImageUrls || '[]');

    // Combine existing and new image URLs
    const updatedImageUrls = [...existingImageUrls, ...newImageUrls];

    // Parse other fields that might be stringified
    const highlights = typeof req.body.highlights === 'string' ? 
      JSON.parse(req.body.highlights) : req.body.highlights;

    // Create updated product object, explicitly setting base64Images to an empty array
    const productData = {
      ...req.body,
      highlights,
      imageUrls: updatedImageUrls,
      base64Images: [] // Explicitly set to empty array to avoid validation error
    };

    // Remove any undefined or null values
    Object.keys(productData).forEach(key => {
      if (productData[key] === undefined || productData[key] === null) {
        delete productData[key];
      }
    });

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      productData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});


export default router;

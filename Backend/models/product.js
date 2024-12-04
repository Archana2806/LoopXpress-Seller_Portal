import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Supplement', 'Clothing', 'Equipment', 'Accessories'],
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  size: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// Use 'export default' instead of 'module.exports'
export default mongoose.model('Product', productSchema);
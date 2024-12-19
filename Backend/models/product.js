import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  imageUrls: [{
    type: String
  }], // Optional: URLs for externally stored images
  base64Images: [{
    type: String,
    validate: {
      validator: function (v) {
        return /^data:image\/[a-z]+;base64,/.test(v); // Ensures valid Base64 image format
      },
      message: props => `${props.value} is not a valid Base64 image string!`
    }
  }], // Array for storing Base64 encoded images
  originalPrice: {
    type: Number,
    required: true
  },
  discountedPrice: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subcategory: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  highlights: [String], // Array of product highlights
  stockAlert: {
    type: Number,
    default: 10 // Default stock alert threshold
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;

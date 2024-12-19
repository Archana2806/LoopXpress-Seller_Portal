import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: [100, 'Title must not exceed 100 characters'],
    required: [true, 'Title is required'],
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true
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
    required: [true, 'Original price is required'],
    min: [0, 'Original price must be at least 0'],
  },
  discountedPrice: {
    type: Number,
    required: [true, 'Discounted price is required'],
    min: [0, 'Discounted price must be at least 0'],
    validate: {
      validator: function (value) {
        return value <= this.originalPrice; // Discounted price must be <= original price
      },
      message: 'Discounted price must be less than or equal to the original price'
    }
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  subcategory: {
    type: String,
    required: [true, 'Subcategory is required'],
    trim: true
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [10, 'Description must be at least 10 characters long'],
    maxlength: [1000, 'Description must not exceed 1000 characters'],
    trim: true
  },
  highlights: {
    type: [String], // Array of product highlights
    validate: {
      validator: function (value) {
        return value.length <= 10; // Limit to 10 highlights
      },
      message: 'You can specify up to 10 highlights only'
    }
  },
  stockAlert: {
    type: {
    type: Number,
    min: [0, 'Stock alert must be at least 0'],
    default: 0
  },
    default: 10 // Default stock alert threshold
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required']
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;

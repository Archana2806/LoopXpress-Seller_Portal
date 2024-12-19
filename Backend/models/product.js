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
    type: String,
    validate: {
      validator: function (value) {
        // Ensure URLs are valid
        return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(value);
      },
      message: 'Each image URL must be a valid URL'
    }
  }],
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
    type: [String],
    validate: {
      validator: function (value) {
        return value.length <= 10; // Limit to 10 highlights
      },
      message: 'You can specify up to 10 highlights only'
    }
  },
  stockAlert: {
    type: Number,
    min: [0, 'Stock alert must be at least 0'],
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required']
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;

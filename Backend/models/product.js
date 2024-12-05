import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true,
  },
  brand: {
    type: String,
    required: [true, 'Brand name is required'],
    trim: true,
  },
  imageUrls: {
    type: [String],
    validate: {
      validator: function(v) {
        return v.length === 4;
      },
      message: 'Product must have exactly 4 image URLs'
    },
    required: [true, 'Product images are required']
  },
  originalPrice: {
    type: Number,
    required: [true, 'Original price is required'],
    min: 0,
  },
  discountedPrice: {
    type: Number,
    required: [true, 'Discounted price is required'],
    min: 0,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  subcategory: {
    type: String,
    required: [true, 'Subcategory is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: 0,
  },
  size: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
  },
  material: {
    type: String,
    trim: true,
  },
  weight: {
    type: String,
    trim: true,
  },
  dimensions: {
    type: String,
    trim: true,
  },
  manufacturingDate: {
    type: Date,
  },
  warranty: {
    type: String,
    trim: true,
  },
  shippingInfo: {
    type: String,
    trim: true,
  },
  highlights: {
    type: [String],
    default: [],
  },
  stockAlert: {
    type: Number,
    required: [true, 'Stock alert level is required'],
    min: 0,
  },
}, {
  timestamps: true,
});

productSchema.index({ title: 'text', brand: 'text', description: 'text' });

productSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

productSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice && this.discountedPrice) {
    return Math.round(((this.originalPrice - this.discountedPrice) / this.originalPrice) * 100);
  }
  return 0;
});

productSchema.methods.isLowStock = function() {
  return this.quantity <= this.stockAlert;
};

productSchema.statics.findLowStock = function() {
  return this.find({
    $expr: {
      $lte: ['$quantity', '$stockAlert']
    }
  });
};

export default mongoose.model('Product', productSchema);
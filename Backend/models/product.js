import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    default: function() {
      return this.userInfo?.personalDetails?.fullName 
        ? this.userInfo.personalDetails.fullName.charAt(0).toUpperCase() + this.userInfo.personalDetails.fullName.slice(1) 
        : 'Name not available';
    }
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true
  },
  imageUrls: {
    type: [String],
    required: [true, 'At least one image URL is required'],
    validate: {
      validator: function(v) {
        return v.length > 0 && v.some(url => url.trim() !== '');
      },
      message: 'At least one valid image URL is required'
    }
  },
  originalPrice: {
    type: Number,
    required: [true, 'Original price is required'],
    min: [0, 'Price cannot be negative']
  },
  discountedPrice: {
    type: Number,
    required: [true, 'Discounted price is required'],
    min: [0, 'Price cannot be negative'],
    validate: {
      validator: function(v) {
        return v <= this.originalPrice;
      },
      message: 'Discounted price cannot be higher than original price'
    }
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    enum: [
      'gym-essentials',
      'outdoor-fitness',
      'yoga',
      'cricket',
      'squash',
      'golf',
      'gymnastics',
      'team-sports',
      'racquet-sports',
      'swimming',
      'cycling',
      'combat-sports',
      'winter-sports',
      'kabaddi',
      'kids-sports',
      'fitness-trackers',
      'athletic-care',
      'sports-nutrition',
      'training-equipment',
      'sports-accessories',
      'dry-fruits',
      'first-aid',
      'cooking-essentials'
    ]
  },
  subcategory: {
    type: String,
    required: [true, 'Subcategory is required'],
    trim: true
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative']
  },
  size: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  material: {
    type: String,
    trim: true
  },
  weight: {
    type: String,
    trim: true
  },
  dimensions: {
    type: String,
    trim: true
  },
  manufacturingDate: {
    type: Date
  },
  warranty: {
    type: String,
    trim: true
  },
  shippingInfo: {
    type: String,
    trim: true
  },
  highlights: {
    type: [String],
    validate: {
      validator: function(v) {
        return v.every(highlight => highlight.trim() !== '');
      },
      message: 'Highlights cannot be empty strings'
    }
  },
  stockAlert: {
    type: Number,
    required: [true, 'Stock alert level is required'],
    min: [0, 'Stock alert level cannot be negative']
  }
}, {
  timestamps: true
});

// Add indexes for better search performance
productSchema.index({ 
  title: 'text', 
  brand: 'text', 
  category: 'text', 
  subcategory: 'text',
  description: 'text' 
});

const Product = mongoose.model('Product', productSchema);

export { Product };

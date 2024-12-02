import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  personalDetails: {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,  // Ensure no duplicate emails
      lowercase: true, // Normalize email to lowercase
      trim: true, // Remove extra spaces from the email
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    password: {   // Add password field to handle user authentication
      type: String,
      required: true,
    },
  },
  businessDetails: {
    businessName: {
      type: String,
      required: true,
    },
    businessType: {
      type: String,
      required: true,
    },
    businessPhone: {
      type: String,
      required: true,
    },
    businessEmail: {
      type: String,
      required: true,
    },
    gstNumber: {
      type: String,
      required: true,
    },
  },
  bankDetails: {
    accountNumber: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    ifscCode: {
      type: String,
      required: true,
    },
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Hash the password before saving the user
// Hash the password before saving the user
userSchema.pre('save', async function(next) {
  if (this.isModified('personalDetails.password')) {
    console.log('Password before hashing:', this.personalDetails.password);  // Log the password
    if (!this.personalDetails.password) {
      return next(new Error("Password is required"));
    }
    const salt = await bcrypt.genSalt(10);
    this.personalDetails.password = await bcrypt.hash(this.personalDetails.password, salt);
  }
  next();
});


// Create indexes for better query performance, especially for email
userSchema.index({ 'personalDetails.email': 1 });

// Create a mongoose model for User
const User = mongoose.model('User', userSchema);

export default User;

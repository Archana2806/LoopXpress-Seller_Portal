import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    personalDetails: {
      fullName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true ,
        lowercase: true,
        trim: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
        select: false,
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
    resetPasswordToken: {
      type: String,
      default: null, // Null by default
    },
    resetPasswordExpires: {
      type: Date,
      default: null, // Null by default
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Instance method to set password
userSchema.methods.setPassword = async function (password) {
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log('Salt:', salt);
  console.log('Hashed Password:', hashedPassword);
  this.personalDetails.password = hashedPassword;
};

// Instance method to compare passwords
userSchema.methods.isValidPassword = async function (candidatePassword, hashedPassword) {
  console.log('Candidate Password:', candidatePassword);
  const isMatch = await bcrypt.compare(candidatePassword, hashedPassword);
  console.log('Password Match:', isMatch);
  return isMatch;
};


// Create indexes for better query performance, especially for email
userSchema.index({ 'personalDetails.email': 1 });

// Create a mongoose model for User
const User = mongoose.model('User', userSchema);

export default User;
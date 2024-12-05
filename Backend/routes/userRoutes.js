import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import authenticate from '../middleware/authenticate.js'; // Import middleware

const router = express.Router();

// Signup route
router.post('/submit-form', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error saving user data:', error);
    res.status(500).json({ message: 'Error saving user data' });
  }
});

// Login route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ 'personalDetails.email': email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.personalDetails.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.personalDetails.email },
      'your_jwt_secret',
      { expiresIn: '2h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected user info route
router.get('/user-info', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-personalDetails.password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user info route
router.put('/update-user-info', authenticate, async (req, res) => {
  try {
    const { personalDetails, businessDetails } = req.body;

    // Update the user with the provided details
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id, // Assuming `authenticate` adds `req.user.id`
      { personalDetails, businessDetails },
      { new: true } // Ensure the updated document is returned
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser); // Return the updated user object
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/update-business-info', authenticate, async (req, res) => {
  try {
    const { businessDetails } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.businessDetails = { ...user.businessDetails, ...businessDetails };
    await user.save();

    res.status(200).json({
      message: 'Business info updated successfully',
      businessDetails: user.businessDetails,
    });
  } catch (error) {
    console.error('Error updating business info:', error);
    res.status(500).json({ message: 'Server error' });
  }
});





export default router;

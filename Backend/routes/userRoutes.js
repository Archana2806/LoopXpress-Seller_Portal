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
  console.log("email and password", email, password
  )

  try {
    const user = await User.findOne({ 'personalDetails.email': email }).select(
      '+personalDetails.password'
    );
    console.log(user)
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const hashedPassword = user.personalDetails.password;
    console.log("hashedpassword", hashedPassword)

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.personalDetails.email },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '2h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.personalDetails.email,
        fullName: user.personalDetails.fullName,
      },
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Protected user info route
router.get('/user-info', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-personalDetails.password');
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

    // Fetch the current user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Merge existing password into personalDetails if not provided in the request
    const updatedPersonalDetails = {
      ...user.personalDetails,
      ...personalDetails,
      password: user.personalDetails.password, // Preserve the existing password
    };

    // Update the user with merged personalDetails and provided businessDetails
    user.personalDetails = updatedPersonalDetails;
    user.businessDetails = businessDetails || user.businessDetails;

    // Save the updated user object
    await user.save();

    res.status(200).json(user); // Return the updated user object
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update business info route
router.put('/update-business-info', authenticate, async (req, res) => {
  try {
    const { businessDetails } = req.body;
    const user = await User.findById(req.user.id);
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

// Update password route
router.put('/update-password', authenticate, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Both current and new passwords are required.' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.personalDetails.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    user.personalDetails.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

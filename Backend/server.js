import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import sellerRoutes from './routes/sellerRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Test route to verify server is working
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working' });
});

app.use('/api/users', userRoutes);
app.use('/api/seller', sellerRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
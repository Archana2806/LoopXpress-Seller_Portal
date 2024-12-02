import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import gstRoutes from './routes/gstRoutes.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/gst', gstRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Environment Check:', {
        hasRapidApiKey: !!process.env.RAPID_API_KEY,
        hasRapidApiHost: !!process.env.RAPID_API_HOST
    });
}); 
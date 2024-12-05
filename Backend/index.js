import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";  // Import the cors package
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import gstRoutes from "./routes/gstRoutes.js";
// import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // Allow your frontend to access the backend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the necessary HTTP methods
  credentials: true,  // Enable cookies if needed
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/gst", gstRoutes);
// app.use("/api/products", productRoutes);
app.listen(port, () => console.log(`Server running on port: ${port}`));

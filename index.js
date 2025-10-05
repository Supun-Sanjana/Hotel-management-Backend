import express from 'express';
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from './src/router/userRoute.js';
import galleryRouter from './src/router/galleryRoute.js';
import categoryRouter from './src/router/categoryRoute.js';
import jwt from "jsonwebtoken";
import roomRouter from './src/router/roomRoute.js';
import bookingRouter from './src/router/bookingRoute.js';
import cors from "cors"
import uploadRouter from './src/router/upload.js';

dotenv.config();
const app = express();

app.use(cors())
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());

// JWT middleware
app.use((req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) return next();

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("JWT verification failed:", err.message);
      return next();
    }
    req.user = decoded; // ✅ safe for GET/POST
    console.log("Decoded JWT:", decoded);
    next();
  });
});


// MongoDB
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Error connecting to MongoDB:", err));


const PORT = process.env.PORT || 5000;

// Root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend is alive ✅" });
});

// Routes
app.use("/api/v1", userRoute);
app.use("/api/v1/gallery", galleryRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/room", roomRouter);
app.use("/api/v1/booking", bookingRouter);
app.use("/upload", uploadRouter)

// Start server
app.listen(PORT, () => {
  console.log(`--------> Server is running on port ${PORT}`);
});

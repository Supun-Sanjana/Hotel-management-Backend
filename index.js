import express from 'express';
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from './src/router/userRoute.js'
import galleryRouter from './src/router/galleryRoute.js'
import categoryRouter from './src/router/categoryRoute.js'
dotenv.config();
import jwt from "jsonwebtoken"

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return next(); // no token → just move on
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("JWT verification failed:", err.message);
      return next(); // invalid/expired token → continue without user
    }

    req.body.user = decoded;
    console.log("Decoded JWT:", decoded);
    next();
  });
});




mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("✅ Connected to MongoDB");
})
    .catch((err) => {
        console.error("❌ Error connecting to MongoDB:", err);
    });



const PORT = process.env.PORT || process.env.SERVER_PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend is alive ✅" });
});


app.use("/api/v1", userRoute)
app.use("/api/v1/gallery", galleryRouter)
app.use("/api/v1/category", categoryRouter)

app.listen(PORT, () => {
    console.log(`--------> Server is running on port ${PORT}`);

})
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

    if (token != null) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (decoded != null) {
                req.body.user = decoded; // attach user payload to request
                console.log("Decoded JWT:", decoded);
                next();
            }else{
                next();
            }
        })
    }else{
        next();
    }

    // if (!token) {
    //     return res.status(401).json({ error: "Access denied. No token provided." });
    // }

    // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    //     if (err) {
    //         return res.status(403).json({ error: "Invalid or expired token" });
    //     }

    //     req.body.user = decoded; // attach user payload to request
    //     console.log("Decoded JWT:", decoded);
    //     next();
    // });
});




mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("✅ Connected to MongoDB");
})
    .catch((err) => {
        console.error("❌ Error connecting to MongoDB:", err);
    });



const PORT = process.env.PORT || process.env.SERVER_PORT || 5000;

app.use("/api/v1", userRoute)
app.use("/api/v1/gallery", galleryRouter)
app.use("/api/v1/category", categoryRouter)

app.listen(PORT, (req, res) => {
    console.log(`--------> Server is running on port ${PORT}`);

})
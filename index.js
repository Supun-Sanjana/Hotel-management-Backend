import express from 'express';
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from './src/router/userRoute.js'
dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("✅ Connected to MongoDB");
})
    .catch((err) => {
        console.error("❌ Error connecting to MongoDB:", err);
    });


const PORT = process.env.SERVER_PORT

app.use("/api/v1", userRoute)

app.listen(PORT, (req, res) => {
    console.log(`server is running on port ${PORT}`);

})
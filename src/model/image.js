import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    url: { type: String, required: true },       // Cloudinary URL
    filename: { type: String },                  // Optional: original filename
    createdAt: { type: Date, default: Date.now },
});

const Image = mongoose.model("Image", imageSchema);
export default Image;

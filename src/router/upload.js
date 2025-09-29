import express from "express";
import upload from "../../upload.js";
import Image from "../model/image.js";  // <-- import model

const uploadRouter = express.Router();

uploadRouter.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Save image URL to MongoDB
    const newImage = new Image({
      url: req.file.path,
      filename: req.file.originalname,
    });
    await newImage.save();

    res.json({
      success: true,
      url: req.file.path,
      message: "Image uploaded & saved to DB ✅",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// GET /upload
uploadRouter.get("/", async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});



export default uploadRouter;

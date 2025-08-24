import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,  // makes email always lowercase
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true }); // adds createdAt & updatedAt

export default mongoose.model("User", userSchema);

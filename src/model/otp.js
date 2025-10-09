import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 120, // ⏰ Automatically deletes document after 2 minutes
    },
});

const otp = mongoose.model("otp", otpSchema);
export default otp
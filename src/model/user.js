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
    image:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
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
    },
    type:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    whatsApp:{
        type: String,
        trim: true
    },
    phoneNumber:{
        type: String,
        trim: true

    },
    disabled:{
        type: Boolean,
        required: true,
        default: false
    },
    emailVerified:{
        type: Boolean,
        required: true,
        default: false
    }

}, { timestamps: true }); // adds createdAt & updatedAt

const User = mongoose.model("User", userSchema);

export default User;

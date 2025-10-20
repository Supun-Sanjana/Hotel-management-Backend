import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    maxGuests: {
        type: Number,
        required: true,
        default: 3
    },
    available: {
        type: Boolean,
        default: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: [{
        type: String,

    }
    ],
    description: {
        type: String,
        required: true,
        default: "No description"
    },
    notes:{
        type: String,
        default: ""
    }
})

const Room = mongoose.model("Rooms", roomSchema);

export default Room
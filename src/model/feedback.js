import mongoose from 'mongoose'

const feedbackSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    message:{
        type:String,
        
    }
}, { timestamps: true })

const FeedBack = mongoose.model("feedback",feedbackSchema )
export default FeedBack
const mongoose = require("mongoose");
const FeedbackSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email:{
        type:String,
        required:true
    },
    feedback: {
        type: String,
        required: [true, 'Feedback is required'],
    },
    date:{
        type: Date,
        default: Date.now
    }
})

const Feedback = mongoose.model("feedback", FeedbackSchema)
module.exports = Feedback
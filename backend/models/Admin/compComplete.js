const mongoose = require('mongoose')

const compCompleteSchema = mongoose.Schema({
    complaintId:{
        type:String,
        require:true
    },
    name: {
        type: String,
        require: true
    },
    complaintType: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    streetAddress: {
        type: String,
        require: true
    },
    area: {
        type: String,
        require: true
    },
    pincode: {
        type: Number,
        require: true
    },
    complaintDesc: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    empName: {
        type: String,
        require: true
    },
    empEmail: {
        type: String,
        require: true
    },
    completeDate:{
        type:Date,
        default: Date.now()
    }
})


module.exports = mongoose.model("compComplete", compCompleteSchema)
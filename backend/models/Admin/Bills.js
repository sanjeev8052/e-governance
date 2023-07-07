const mongoose = require('mongoose')

const billSchema = mongoose.Schema({
    billType:{
        type:String,
        required:true
    },
    ownerName:{
        type:String,
        required:true
    },
    tenamentNo:{
        type:Number,
        required:true
    },
    streetAddress:{
        type:String,
        required:true
    },
    area:{
        type:String,
        required:true
    },
    pastDueAmt:{
        type:Number,
        require:true
    },
    amount:{
        type:Number,
        required:true
    },
    totelAmt:{
        type:Number,
        required:true
    },
    addDate:{
        type:Date,
        default:Date.now
    },
    lastDueDate:{
        type:Date,
        default:Date.now() + 20 * 24 * 60 * 60 * 1000
    },
    paymentId:Number,
    status:String,

})

const Bills = mongoose.model("bills" ,billSchema)
module.exports = Bills
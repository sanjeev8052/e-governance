const mongoose = require('mongoose')

const IncomeSchema = mongoose.Schema({
    uniqueId: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    age: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    village: {
        type: String,
        require: true
    },
    tehsil: {
        type: String,
        require: true
    },
    district: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    gender:{
        type:String,
        require:true

    },
    fatherName: {
        type: String,
        require: true
    },

    income: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    purpose:{
        type: String,
        require: true
    },
    proof:String,

    status: String
})

const Income = mongoose.model("income", IncomeSchema)
module.exports = Income
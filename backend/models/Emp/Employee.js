const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const crypto = require('crypto')
const jwt = require('jsonwebtoken');

const EmpSchema = new mongoose.Schema({
    avatar: {
       type:String
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true

    },
    gender: {
        type: String,
        required: true

    },
    phone: {
        type: Number,
        required: true

    },
    password: {
        type: String,
        required: true

    },
    dept :{
        type:String,
        required:true,
    },
    request:{
        type:Boolean,
        default: true
    },
    status:String,
    complaints:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Complaint"
        }
    ],
    DOB: Date,
    houseNO: String,
    societyName: String,
    area: String,
    city: String,
    state: String,
    pincode: Number,
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

// Hashing Password
EmpSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next();
})

// generate token
EmpSchema.methods.generateEmpToken = async function () {
    try {
        let emptoken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
        return emptoken;
    } catch (error) {
        console.log(error)
    }
}


EmpSchema.methods.getResetPasswordToken = async function () {

    const resetToken = crypto.randomBytes(20).toString('hex')
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex')
    this.resetPasswordExpire = Date.now() + 5 * 60 * 1000;
    return resetToken
}

const Employee = mongoose.model("Employee", EmpSchema);
module.exports = Employee;
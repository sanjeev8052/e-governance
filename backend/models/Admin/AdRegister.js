const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const { Schema } = mongoose;
const Adschema = new Schema({
    avatar: {
        type:String
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
    
})
 
// hashing password
Adschema.pre('save', async function (next) {
    
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next();
})

// generate token

Adschema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
        return token;
    } catch (error) {
        console.log(error)
    } 
}

Adschema.methods.getResetPasswordToken = async function () {

    const resetToken = crypto.randomBytes(20).toString('hex')
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex')
    this.resetPasswordExpire = Date.now() + 5 * 60 * 1000;
    return resetToken
}


const AdRegister = mongoose.model("addadmin", Adschema);
module.exports = AdRegister;
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = mongoose.Schema({
    avatar: {
        type: String,
    },
    name: {
        type: String,
        required: [true],
    },
    phone: {
        type: Number,
        required: true,

    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,

    },
    paidBills: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "bills"
        }
    ],

    gender: String,
    DOB: Date,
    houseNO: String,
    societyName: String,
    area: String,
    city: String,
    state: String,
    pincode: Number,
    status: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date

});
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
})

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = async function () {
    return jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
}

userSchema.methods.getResetPasswordToken = async function () {

    const resetToken = crypto.randomBytes(20).toString('hex')
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex')
    this.resetPasswordExpire = Date.now() + 5 * 60 * 1000;
    return resetToken
}

module.exports = mongoose.model("User", userSchema);
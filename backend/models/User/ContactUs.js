const mongoose = require("mongoose");
const contactUsSchem = mongoose.Schema({
    fName: {
        type: String,
        required: [true, 'First Name is required'],
    },
    lName: {
        type: String,
        required: [true, 'Last  Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    phone: {
        type: String,
        required: [true, 'Email is required'],
    },
    message: {
        type: String,
        required: [true, 'Email is required'],
    },

    date: Date
})

const ContactUs = mongoose.model("ContactUs", contactUsSchem)
module.exports = ContactUs
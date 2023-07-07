const express = require('express');
const ConnectDB = require('./config/database');
const cors = require('cors')
const Razorpay = require('razorpay')
const cookieParser = require('cookie-parser')
const cloudinary = require('cloudinary')
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({
  extended: true,
}))

app.use('/PDF', express.static('PDF'))
app.use('/Profile', express.static('Profile'))
app.use(cors())
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))


require('dotenv').config({ path: 'config/config.env' })
ConnectDB();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true
});
exports.instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

// Admin
app.use("/api/admin", require("./Routes/Admin/Adminlog"))
app.use("/api/admin", require("./Routes/Admin/Employee"))
app.use("/api/admin", require("./Routes/Admin/User"))
app.use("/api/admin", require("./Routes/Admin/complaint"))
app.use("/api/admin", require("./Routes/Admin/Categories"))
app.use("/api/admin", require("./Routes/Admin/Bills"))
app.use("/api/admin", require("./Routes/Admin/Dashboard"))


// Employee
app.use("/api/employee", require("./Routes/Emp/Emplogin"))

// User
app.use("/api/", require('./Routes/User/userRoutes'))
app.use('/api', require('./Routes/User/complaint'))
app.use('/api', require('./Routes/User/meter'))
app.use('/api', require('./Routes/User/income'))
app.use('/api', require('./Routes/User/cast'))
app.use('/api', require('./Routes/User/feedback'))

app.use('/api', require('./Routes/Payment'))

module.exports = app
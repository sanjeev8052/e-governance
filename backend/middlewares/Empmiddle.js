
const jwt = require("jsonwebtoken")
const Employee = require("../models/Emp/Employee")

exports.isAuthenticateemp = async (req, res, next) => {

    try {
        const { empToken } = req.cookies
        // console.log()
        if (!empToken) {
            return res.status(401).json({ message: "Please Login First" })
        }
        const decoded = jwt.verify(empToken, process.env.SECRET_KEY)
        req.emp = await Employee.findById(decoded._id)
        
        next();
    } catch (error) {
        res.status(500).json(error.message)
    }
}
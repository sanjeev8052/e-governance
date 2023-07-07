
const AdRegister = require("../models/Admin/AdRegister")
const jwt = require("jsonwebtoken")

exports.isAuthenticate = async (req, res, next) => {

    try {
        const { adminToken } = req.cookies
        // console.log()
        if (!adminToken) {
            return res.status(401).json({ message: "Please Login First" })
        }
        const decoded = jwt.verify(adminToken, process.env.SECRET_KEY)
        req.admin = await AdRegister.findById(decoded._id)
        
         next();
    } catch (error) {
        res.status(500).json(error.message)
    }
}
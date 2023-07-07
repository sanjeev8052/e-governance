const  User = require('../models/User/UserModel')
const jwt = require('jsonwebtoken');
const Employee = require('../models/Emp/Employee');
exports.isAuthenticatedUser = async (req, res, next)=>{
    try {
        const {Token} = req.cookies;
    
    if(!Token){
                return res
                .status(401)
                .json({message:" Please login first"})
            }
         const decoded = jwt.verify(Token,process.env.SECRET_KEY)
         req.user = await User.findById(decoded._id)
          next();
    } catch (error) {
        res.status(500).json({
                        success: false,
                        message: error.message,
                    })
    }
}



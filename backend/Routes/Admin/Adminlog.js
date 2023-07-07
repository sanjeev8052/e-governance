const express = require("express");
const bcrypt = require("bcrypt")
const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const router = express.Router();
const { sendEmail } = require('../../middlewares/sendEmail')
const AdRegister = require("../../models/Admin/AdRegister")
const { body, validationResult, } = require('express-validator');
const { isAuthenticate } = require("../../middlewares/Adminmiddle");
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Profile')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

const upload = multer({ storage: storage })

// For Admin Register
router.post("/aregister", [
    body('email', 'Enter a valid E-mail').isEmail(),
    body('name', 'Enter a valid Name').isLength({ min: 5 }),
    body('password', 'Enter minimum 5 length password').isLength({ min: 5 }),
], async (req, res) => {

    // if there are error then send bad request
    const errors = validationResult(req);
    if (!errors.isadminty()) {
        return res.status(404).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const chmail = await AdRegister.findOne({ email });

    try {


        if (chmail) {
            res.status(400).json({ error: "Email is already exist" })
        }
        else {
            const aregister = new AdRegister({ name, email, password })

            await aregister.save();
            res.status(201).json({ msg: "Admin Registered" });
        }


    } catch (error) {
        res.status(400).json({ message: "Something Went Wrong " })

    }
})

// For Login
router.post("/alogin", [
    body('email', 'Enter a valid E-mail').isEmail(),
    body('password', 'Enter minimum 5 length password').isLength({ min: 5 }),
], async (req, res) => {

    // if there are error then send bad request
    // const errors = validationResult(req);
    // if (!errors.isadminty()) {
    //     return res.status(404).json({ errors: errors.array() });
    // }

    const { email, password } = req.body;
    try {
        let token;
        const admin = await AdRegister.findOne({ email });
        if (!admin) {
            return res.status(404).json({  success: false, message: "Email is not Found" })
        }
        else {
            const chpassword = await bcrypt.compare(password, admin.password);

            if (!chpassword) {
                return res.status(404).json({  success: false, message: "Please Try to Login Proper Password" })
            }
            else {
                token = await admin.generateAuthToken();
                // console.log({ token: token })
                const option = {
                    httpOnly: true,
                    expires: new Date(Date.now() + 86400 * 1000)
                }

                res.status(201).json({
                    success: true,
                    message: "Welcome Back",
                    Admintoken: token
                })

            }


        }



    } catch (error) {
        return res.status(404).json({ error: error.message })
    }

})

// For Profile
router.get("/profile", isAuthenticate, async (req, res) => {
    try {
        const admin = await AdRegister.findById(req.admin._id)
        res.send(admin)
    } catch (error) {
        res.status(400).json(error.message)
    }
}
)


// For Logout
router.get("/logout", async (req, res) => {
    try {
        res
            .status(200)
            .cookie("adminToken", null, { expires: new Date(Date.now()), httpOnly: true })
            .json({ success: true, message: "Logout" })
    } catch (error) {
        res
            .status(500)
            .json({ success: false, Error: error.message })
    }

})

// For Image
router.get("/profile/image", isAuthenticate, async (req, res) => {
    try {

        const avatar = req.admin.avatar
        res.status(200).send(avatar)
    } catch (error) {
        res.status(500).json({ sucsess: false, message: error.message })
    }
})

router.put("/upload/update", isAuthenticate, upload.single("image"), async (req, res) => {
    try {


        const file = (req.file) ? req.file.filename : null
        const admin = req.admin
        
        if (!file) {
            return res
                .status(400)
                .json({ sucsess: false, message: "Somthing Went Wroung..." })
        }
        admin.avatar = file
        await admin.save();
        res.status(200).json({
            success: true,
            message: " Profile Updated"
        })

    } catch (error) {
        res.status(500).json({ sucsess: false, message: error.message })
    }
})

router.post("/upload", isAuthenticate,upload.single("image"), async (req, res) => {
    try {

        const file =(req.file) ? req.file.filename : null
        const { _id } = req.admin
        if (!file) {
            return res
                .status(400)
                .json({ sucsess: false, message: "Somthing Went Wroung..." })
        }
        const admin = await AdRegister.findById(_id)
        if (!admin) {
            return res.status(400).json({ message: "Admin Not Found" })
        }
        admin.avatar = file
        await admin.save();
        res.status(200).json({
            success: true,
            message: " Profile Added"
        })

    } catch (error) {
        res.status(500).json({ sucsess: false, message: error.message })
    }

})
router.delete("/upload/delete", isAuthenticate, async (req, res) => {
    try {

        const user = req.admin
        const avatar = undefined
        user.avatar = avatar
        await user.save();
        res.status(200).json({
            success: true,
            message: " Profile Image Deleted"
        })

    } catch (error) {
        res.status(500).json({ sucsess: false, message: error.message })
    }
})

router.post("/forgot/password", async (req, res) => {
    try {
        const admin = await AdRegister.findOne({ email: req.body.email });
        if (!admin) {
            return res
                .status(400)
                .json({ success: false, message: "Email does not exists.." })
        }
        
        const resetPasswordToken = await admin.getResetPasswordToken();
        await admin.save();

        console.log(admin)

        const resetUrl = `${req.protocol}://localhost:3000/adminreset/password/${resetPasswordToken}`;
        const message = `reset your password by clicking on the link below: \n\n${resetUrl}`
        try {
            await sendEmail({
                email: admin.email,
                subject: "reset Password",
                message
            });

            res.status(200).json({
                success: true,
                message: `Forgot password link sent to ${admin.email}........`,
            })
        } catch (error) {
            admin.resetPasswordToken = undefined;
            admin.resetpasswordExpire = undefined;
            await admin.save()

        }
    } catch (error) {
        res.status(500).json({ sucsess: false, message:error.message })
    }
})
router.put("/adminreset/password/:token", async (req, res) => {

    try {

       
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

        const admin = await AdRegister.findOne({
            resetPasswordToken,
            resetPasswordExpire :{$gt: Date.now()}
        })


        if (!admin) {
            return res
                .status(401)
                .json({ success: false, message: "Token is invalid or has expired.." })
        }

        admin.password = req.body.password;

        admin.resetPasswordToken = undefined;
        admin.resetPasswordExpire = undefined;
        await admin.save()
       
        res.status(200).json({ success: true, message: "Password Updadet..", password: admin.password })


    } catch (error) {
        res.status(500).json({ sucsess: false, message:error.message })

    }

})



module.exports = router
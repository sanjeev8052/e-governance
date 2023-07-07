const express = require("express");
const router = express.Router();
const cloudinary = require('cloudinary').v2
const User = require('../../models/User/UserModel')
// const { body, validationResult, cookie } = require('express-validator');
const { sendEmail } = require('../../middlewares/sendEmail')
const crypto = require('crypto')
const { errorHandler } = require("../../middlewares/Errorhandler");
const { isAuthenticatedUser } = require("../../middlewares/auth");
const multer = require('multer');
const ContactUs = require("../../models/User/ContactUs");
const Feedback = require("../../models/User/Feedback");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Profile')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

const upload = multer({ storage: storage })
router.post("/upload", isAuthenticatedUser, upload.single("image"), async (req, res) => {
    try {
        const { _id } = req.user
        const file = (req.file) ? req.file.filename : null
        if (!file) {
            return res
                .status(400)
                .json({ sucsess: false, message: "Somthing Went Wroung..." })
        }
        const user = await User.findById(_id)
        if (!user) {
            return res.status(400).json({ message: "User  Not Found" })
        }

        user.avatar = file
        await user.save();
        res.status(200).json({
            success: true,
            message: " Profile Added"
        })

    } catch (error) {
        res.status(500).json({ sucsess: false, message: error.message })
    }

})
router.put("/upload/update", isAuthenticatedUser, upload.single("image"), async (req, res) => {
    try {

        // const { _id } = req.user
        const file = (req.file) ? req.file.filename : null
        const user = req.user
        // const p_id = req.user.avatar.public_id
        if (!file) {
            return res
                .status(400)
                .json({ sucsess: false, message: "Somthing Went Wroung..." })
        }

        user.avatar = file
        await user.save();
        res.status(200).json({
            success: true,
            message: " Profile Updated"
        })

    } catch (error) {
        res.status(500).json({ sucsess: false, message: error.message })
    }
})
router.delete("/upload/delete", isAuthenticatedUser, async (req, res) => {
    try {

        const user = req.user
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
router.get("/profile/image", isAuthenticatedUser, async (req, res) => {
    try {

        const avatar = req.user.avatar
        res.status(200).send(avatar)
    } catch (error) {
        res.status(500).json({ sucsess: false, message: error.message })
    }
})




router.post("/user/new/", async (req, res) => {


    try {
        const { name, email, password, phone } = req.body
        let user = await User.findOne({ email });
        if (user) {
            return res
                .status(400)
                .json({ sucsess: false, Regmessage: "user already exists....." })
        }
        const message = "WELCOME TO PROFILE BASED E-GOVERNANCE ONLINE SERVICE PORTAL"
        user = await User.create({ name, email, phone, password })
        user.save();
        await sendEmail({
            email: user.email,
            subject: "Register Successfull",
            message
        });
        res.status(201).json({
            sucsess: true,
            Regmessage: "Register Success."
        })
    } catch (error) {
        res.status(500).json({ sucsess: false, Regmessage: error.message })
    }
});
router.post("/user/login", async (req, res) => {


    try {
        const { email, password } = req.body

        let user = await User.findOne({ email: email, status: undefined }).select("+password");
        // let statuses = await User.find({ status: "block" })
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid Username & Password" })
        }

        const isMatch = await user.matchPassword(password)

        if (!isMatch) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid Username & Password" })

        }
        const option = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        const token = await user.generateToken()
        res.status(200).json({ success: true, message: "Login Success", token: token })



    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
        console.log(error)
    }


});
router.get("/me", isAuthenticatedUser, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("paidBills")
        res.send(user)
    } catch (error) {
        res.status(500).json({ sucsess: false, message: error.message })
    }

});
router.get("/logout", async (req, res) => {
    try {
        res
            .status(200)
            .cookie("Token", null, { expires: new Date(Date.now()), httpOnly: true })
            .json({ success: true, message: "Logout" })
    } catch (error) {
        res
            .status(500)
            .json({ success: false, Error: error.message })
    }

})
router.get("/search/:id", async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return res
            .status(404)
            .json({ success: false, message: "user not found" })
    }


    res.send(user)


})
router.post("/forgot/password", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "Email does not exists.." })
        }

        const resetPasswordToken = await user.getResetPasswordToken();

        await user.save();

        const resetUrl = `${req.protocol}://localhost:3000/reset/password/${resetPasswordToken}`;
        const message = `reset your password by clicking on the link below: \n\n${resetUrl}`
        try {
            await sendEmail({
                email: user.email,
                subject: "reset Password",
                message
            });

            res.status(200).json({
                success: true,
                message: `Forgot password link sent to ${user.email}........`,
            })
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetpasswordExpire = undefined;
            await user.save();


        }
    } catch (error) {
        res.status(500).json({ sucsess: false, message: "sumthig wrong" })
    }
})
router.put("/reset/password/:token", async (req, res) => {

    try {


        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })


        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: "Token is invalid or has expired.." })
        }

        user.password = req.body.password;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save()

        res.status(200).json({ success: true, message: "Password Updadet..", password: user.password })



    } catch (error) {
        res.status(500).json({ sucsess: false, message: "sumthig went wrong" })

    }

})


router.post("/update/profile/:id", async (req, res) => {

    try {
        let user = await User.findById(req.params.id)

        user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json({
            message: "Profile Updated..",
            type: "success"

        })
    } catch (error) {
        res.status(500).json({ sucsess: false, message: error.message })

    }

})
router.post("/contactUs", async (req, res) => {

    try {
        const contactInfo = await ContactUs.create(req.body)
        res.status(200).json({
            message: "Message send Successfully.."
        })

    } catch (error) {
        res.status(500).json({ sucsess: false, message: error.message })

    }

})

router.post("/user/feedback", isAuthenticatedUser, async (req, res) => {

    const email = req.user.email
    const feedb = await Feedback.find({ email: email })

    if (feedb[0]) {
        const newFeedback = await Feedback.findByIdAndUpdate(feedb[0]._id, { feedback: req.body.feedback }, { new: true })
        res.status(200).json({
            message: "Thanks for feedback.."
        })
        return

    }
    const create = {
        feedback: req.body.feedback,
        name: req.user.name,
        email: req.user.email,
    }
    const feedback = await Feedback.create(create)
    res.status(200).json({
        message: "Thanks for feedback.."
    })
})

router.get("/get/feedback", isAuthenticatedUser, async (req, res) => {

    const feedback = await Feedback.find({ email: req.user.email })
    res.status(200).json({
        feedback
    })
})
router.get("/get/feedbacks", async (req, res) => {

    const feedbacks = await Feedback.find({})
    res.status(200).json({
        feedbacks
    })
})
router.delete("/delete/feedback/:id", async (req, res) => {

    const feedbacks = await Feedback.findByIdAndDelete(req.params.id)
    res.status(200).json({
       message:"feedback delete.."
    })
})

module.exports = router

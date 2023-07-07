const express = require('express');
const { isAuthenticatedUser } = require('../../middlewares/auth');
const compComplete = require('../../models/Admin/compComplete');
const UserComplaint = require('../../models/User/UserComplaint');

const router = express.Router();

router.post('/comp/req', isAuthenticatedUser, async (req, res) => {
    try {
        const { values, user } = req.body

        const create = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            complaintType: values.complaintType,
            city: values.city,
            streetAddress: values.streetAddress,
            area: values.area,
            pincode: values.pincode,
            complaintDesc: values.complaintDesc,
            status: "Requested"
        }
        const complaint = await UserComplaint.create(create)
        res.status(200).json({
            success: true,
            message: "Requset Success..",
        })

    } catch (error) {
        res
            .status(500)
            .json({ success: false, Error: error.message })
    }
})

router.get('/getComp/req', async (req, res) => {

    try {
        const complaint = await UserComplaint.find({ status: "Requested" })

        res.status(200).send(complaint)

    } catch (error) {
        res
            .status(500)
            .json({ success: false, Error: error.message })
    }
})
router.get('/searchComp/:id', async (req, res) => {

    try {

        const complaint = await UserComplaint.findById(req.params.id)
        res.status(200).send(complaint)

    } catch (error) {
        res
            .status(500)
            .json({ success: false, Error: error.message })
    }
})

router.get('/searchCompByEmail/', isAuthenticatedUser, async (req, res) => {

    try {

        const complaint = await UserComplaint.find({ email: req.user.email, status: "Requested" })
       
        res.status(200).send(complaint)

    } catch (error) {
        res
            .status(500)
            .json({ success: false, Error: error.message })
    }
})

// get  Completed Complaint of each User
router.get('/searchCompCompletebyUser',isAuthenticatedUser,  async (req, res) => {

    try {

        const complaint = await compComplete.find({email:req.user.email})
       
        res.status(200).send(complaint)

    } catch (error) {
        res
            .status(500)
            .json({ success: false, Error: error.message })
    }
})
router.put('/updateComp/:id', async (req, res) => {

    try {

        let complaint = await UserComplaint.findById(req.params.id)
        if (!complaint) {
            return res
                .status(400).json({
                    success: false,
                    message: " complaint not found.."
                })
        }

        complaint = await UserComplaint.findByIdAndUpdate(req.params.id, req.body, { new: true })


        res.status(200).json({
            message: "Complaint Updated"
        })

    } catch (error) {
        res
            .status(500)
            .json({ success: false, Error: error.message })
    }
})

module.exports = router
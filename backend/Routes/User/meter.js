const express = require('express');
const MeterApply = require('../../models/Services/MeterApply');
const router = express.Router();
const multer = require('multer');
const { isAuthenticate } = require('../../middlewares/Adminmiddle');
const { sendEmail } = require('../../middlewares/sendEmail')


// For Multer Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'PDF')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

const upload = multer({ storage: storage })

// For making Request
router.post('/meterreq', upload.single('file'), async (req, res) => {

    try {
        const proof = (req.file) ? req.file.filename : null
        const data = req.body.data
        const object = JSON.parse(data)
        const { name, email, phone, meterType, tenamentNo, city, streetAddress, area } = object
    
         const status = "Requested"
         const meter = new MeterApply({ name, email, phone, meterType, tenamentNo, city, streetAddress, area, proof, status: status })
         await meter.save();
         res.status(200).json({
             message: "Successfully Added",
             meter: meter
         })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

})

// For Get Meter Request
router.get('/getmeterreq', isAuthenticate, async (req, res) => {
    try {
        const request = await MeterApply.find({ status: "Requested" })
        if (!request) {
            return res.status(404).json({ message: "Meter Request Not Found" })
        }
        else {
            res.status(200).json(request)
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// For Accept Request
router.post("/accmeterreq/:_id", isAuthenticate, async (req, res) => {
    try {
        const request = await MeterApply.findById(req.params._id)
        if (!request) {
            return res.status(400).json({ message: "Meter Request  Not Found" })
        }
        else {
            request.status = "Accepted"
            await request.save();
            res.status(200).
                json({
                    success: true,
                    message: "successfully Accepted Meter Request",
                })
                const message = `Your ${request.meterType} Meter Approval Request is Accepted `
                await sendEmail({
                    email: request.email,
                    subject: `${request.meterType} Meter Application...`,
                    message
                });
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// For Reject Request
router.delete("/rejmeterreq/:_id", isAuthenticate, async (req, res) => {
    try {
        const request = await MeterApply.findById(req.params._id)
        if (!request) {
            return res.status(400).json({ message: "Meter Request Not Found" })
        }
        const rejectmeter = await MeterApply.deleteOne({ _id: req.params._id })

        res.status(200).json({
            success: true,
            message: "Successfully Rejected Meter Request"

        })
        const message = `Your ${request.meterType} Meter Approval Request is Rejected Due To Some Reason`
        await sendEmail({
            email: request.email,
            subject: `${request.meterType} Meter Application...`,
            message
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/getaccmeterreq', isAuthenticate, async (req, res) => {
    try {
        const request = await MeterApply.find({ status: "Accepted" })
        if (!request) {
            return res.status(404).json({ message: "Meter Request Not Found" })
        }
        else {
            res.status(200).json(request)
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})







module.exports = router
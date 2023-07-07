const express = require('express');
const multer = require('multer');
const router = express.Router();
const { isAuthenticate } = require('../../middlewares/Adminmiddle');
const Income = require('../../models/Services/IncomeCer');
const { sendEmail } = require('../../middlewares/sendEmail');
const { isAuthenticatedUser } = require('../../middlewares/auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'file') {
            cb(null, 'PDF');
        } else if (file.fieldname === 'file2') {
            cb(null, 'PDF');
        } else {
            cb(new Error('Invalid fieldname'), null);
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

const upload = multer({ storage: storage })

// For Add Income Request
router.post('/incomereq',  upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'file2', maxCount: 1 }
]), async (req, res) => {

    try {
        // const proof = (req.file) ? req.file.filename : null
        const proof = req.files['file2'][0].filename
      
        
        const data = req.body.data
        const object = JSON.parse(data)
        const randomNum = Math.floor(Math.random() * 999999) + 1;

        const { name, email, phone, village, state, tehsil, age,  district, gender, fatherName, purpose ,income } = object
     
        const status = "Requested"
        const cer = new Income({name, email, phone, village, state, age,  tehsil, district, gender, fatherName,purpose,    income, proof, status: status,  uniqueId: randomNum })
        await cer.save();
        res.status(200).json({
            message: "Successfully Added",
            cer: cer
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

})

// For Get Income cer Request
router.get('/getincomereq', isAuthenticate, async (req, res) => {
    try {
        const request = await Income.find({ status: "Requested" })
        if (!request) {
            return res.status(404).json({ message: "Income Certificate Request Not Found" })
        }
        else {
            res.status(200).json(request)
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// For Accept Request
router.post("/accincomecerreq/:_id", isAuthenticate, async (req, res) => {
    try {
        const request = await Income.findById(req.params._id)
        if (!request) {
            return res.status(400).json({ message: "Income Certificate Request  Not Found" })
        }
        else {
            request.status = "Accepted"
            await request.save();
            res.status(200).
                json({
                    success: true,
                    message: "successfully Accepted Income Certificate Request",
                })
            const message = `Your Income Certificate Request is Accepted and Here is the ID is ${request.uniqueId} For Download Certificate`
            await sendEmail({
                email: request.email,
                subject: "Income Certificate Accepted...",
                message
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// For Reject Request
router.delete("/rejincomecerreq/:_id", isAuthenticate, async (req, res) => {
    try {
        const request = await Income.findById(req.params._id)
        if (!request) {
            return res.status(400).json({ message: "Income Cretificaate Request Not Found" })
        }
        const rejectmeter = await Income.deleteOne({ _id: req.params._id })

        res.status(200).json({
            success: true,
            message: "Successfully Rejected Income Certificate Request"

        })
        const message = `Your Income Certificate Request is Rejected Because of Proof is not Valid`
        await sendEmail({
            email: request.email,
            subject: "Income Certificate Rejected...",
            message
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/getaccincomecerreq', isAuthenticate, async (req, res) => {
    try {
        const request = await Income.find({ status: "Accepted" })
        if (!request) {
            return res.status(404).json({ message: "Income Certificate Request Not Found" })
        }
        else {
            res.status(200).json(request)
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
router.post('/searchIncomCer',  async (req, res) => {
    try {
        const {uniqueId} = req.body
        console.log(uniqueId)
        const certificate = await Income.find({ status: "Accepted" ,uniqueId})
        if (!certificate[0]) {
            return res.status(404).json({ message: "Income Certificate  Not Found" })
        }
        else {
            res.status(200).json(certificate)
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})




module.exports = router
const express = require('express');
const multer = require('multer');
const router = express.Router();
const { isAuthenticate } = require('../../middlewares/Adminmiddle');
const Cast = require('../../models/Services/CastCer');
const { sendEmail } = require('../../middlewares/sendEmail')
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

// For Add Cast Request
router.post('/castreq', upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'file2', maxCount: 1 }
]), async (req, res) => {

    try {
        const proof = req.files['file2'][0].filename 
        const image = req.files['file'][0].filename 
        const data = req.body.data
        const object = JSON.parse(data)
        const randomNum = Math.floor(Math.random() * 1000000) + 1;

        const { name, email, phone, village, state, tehsil, district, gender, fatherName, motherName, cast } = object
       
        const status = "Requested"
        const castcer = new Cast({ name, email, phone, village, state, tehsil, district, gender, fatherName, motherName, cast, proof,image, status: status, uniqueId: randomNum })
        await castcer.save();
        res.status(200).json({
            message: "Successfully Added",
            castcer: castcer
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

})

// For Get Cast cer Request
router.get('/getcastreq',  async (req, res) => {
    try {
        const request = await Cast.find({})
        if (!request) {
            return res.status(404).json({ message: "Cast Certificate Request Not Found" })
        }
        else {
            res.status(200).json(request)
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// For Accept Request
router.post("/acccastcerreq/:_id", isAuthenticate, async (req, res) => {
    try {
        const request = await Cast.findById(req.params._id)
        if (!request) {
            return res.status(400).json({ message: "Cast Certificate Request  Not Found" })
        }
        else {
            request.status = "Accepted"
            await request.save();
            res.status(200).
            json({
                success: true,
                message: "successfully Accepted Cast Certificae Request",
            })
         
               const message = `Your Cast Certificate Request is Accepted and Here is the ID is ${request.uniqueId} For Download Certificate`
                await sendEmail({
                email: request.email,
                subject: "Cast Certificate Accepted...",
                message
            });
         }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// For Reject Request
router.delete("/rejcastcerreq/:_id", isAuthenticate, async (req, res) => {
    try {
        const request = await Cast.findById(req.params._id)
        if (!request) {
            return res.status(400).json({ message: "Cast Cretificate Request Not Found" })
        }
        const rejectmeter = await Cast.deleteOne({ _id: req.params._id })

        res.status(200).json({
            success: true,
            message: "Successfully Rejected Cast Certificate Request"

        })
        const message = `Your Cast Certificate Request is Rejected Because of Proof is not Valid`
        await sendEmail({
            email: request.email,
            subject: "Cast Certificate Rejected...",
            message
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/getacccastcerreq', isAuthenticate, async (req, res) => {
    try {
        const request = await Cast.find({ status: "Accepted" })
        if (!request) {
            return res.status(404).json({ message: "Cast Certificate Request Not Found" })
        }
        else {
            res.status(200).json(request)
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
router.post('/searchReciept',  async (req, res) => {
    try {
        const uniqueId  = req.body.uniqueId
    
        const certificate = await Cast.find({uniqueId,status:"Accepted"})
        if(!certificate[0]){
            return res
            .status(400)
            .json({ message: "Cast Cretificate  Not Found" })
        }
        res.status(200).send(certificate)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router
const express = require('express')
const router = express.Router();
const { body, validationResult, } = require('express-validator');
const { isAuthenticate } = require("../../middlewares/Adminmiddle");
const { ComplaintCat, CertificateCat , BillsCat , MeterCat ,Dept} = require('../../models/Admin/Categories');

// For Complaint
router.post('/addcomplaintcat', [
    body('complaintType', "Plaese Fill the field").notEmpty()
], isAuthenticate, async (req, res) => {
    // if there are error then send bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }
    const { complaintType } = req.body;
    const chcomplainttype = await ComplaintCat.findOne({ complaintType })
    try {
        if (chcomplainttype) {
            res.status(400).json({ error: "ComplaintType is already Exist" })
        }
        else {
            const add = await ComplaintCat.create({ complaintType })
            add.save();
            res.status(201).json({
                success: true,
                message: "Succefully Added"
            })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


router.get('/getcomplaintcat', async (req, res) => {
    try {
      
        const complaintcat = await ComplaintCat.find({})
        res.status(200).send(complaintcat)
    } catch (error) {
        res.status(500).json({ success: false, Error: error.message })
    }
})


router.delete("/deletecomplaintcat/:_id", isAuthenticate, async (req, res) => {
    try {
        const complaintcat = await ComplaintCat.findById(req.params._id)
        if (!complaintcat) {
            res.status(401).json({
                success: true,
                message: "Complaint Category Not Found"
            })
        }
        const deletecat = await ComplaintCat.deleteOne({ _id: req.params._id })
        
        res.status(200).json({
            success: true,
            message: "Su1ccessfully Delete Complaint Category "
            
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

// For Certificate

router.post('/addcertificatecat', [
    body('certificateType', "Plaese Fill the field").notEmpty()
], isAuthenticate, async (req, res) => {
    // if there are error then send bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }

    const { certificateType } = req.body;

    const chcertificateType = await CertificateCat.findOne({ certificateType })

    try {
        if (chcertificateType) {
            res.status(400).json({ error: "Certificate Type is already Exist" })
        }
        else {
            const add = await CertificateCat.create({ certificateType })
            add.save();
            res.status(201).json({
                success: true,
                message: "Succefully Added"
            })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/getcertificatecat', isAuthenticate, async (req, res) => {
    try {
        const certificatecat = await CertificateCat.find({})
        res.status(200).send(certificatecat)
    } catch (error) {
        res.status(500).json({ success: false, Error: error.message })
    }
})


router.delete("/deletecertificatecat/:_id", isAuthenticate, async (req, res) => {
    try {
        const certificatecat = await CertificateCat.findById(req.params._id)
        if (!certificatecat) {
            res.status(401).json({
                success: true,
                message: "Certificare Type Not Found"
            })
        }
        const deletecat = await CertificateCat.deleteOne({ _id: req.params._id })
        
        res.status(200).json({
            success: true,
            message: "Successfully Delete Certificate Type"
            
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

// For Bills


router.post('/addbillscat', [
    body('billsType', "Plaese Fill the field").notEmpty()
], isAuthenticate, async (req, res) => {
    // if there are error then send bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }

    const { billsType } = req.body;

    const chbillsType = await BillsCat.findOne({ billsType })

    try {
        if (chbillsType) {
            res.status(400).json({ error: "Bill Type is already Exist" })
        }
        else {
            const add = await BillsCat.create({ billsType })
            add.save();
            res.status(201).json({
                success: true,
                message: "Succefully Added"
            })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/getbillscat', isAuthenticate, async (req, res) => {
    try {
        const billscat = await BillsCat.find({})
        res.status(200).send(billscat)
    } catch (error) {
        res.status(500).json({ success: false, Error: error.message })
    }
})


router.delete("/deletebillscat/:_id", isAuthenticate, async (req, res) => {
    try {
        const billscat = await BillsCat.findById(req.params._id)
        if (!billscat) {
            res.status(401).json({
                success: true,
                message: "Bills Type Not Found"
            })
        }
        const deletecat = await BillsCat.deleteOne({ _id: req.params._id })
        
        res.status(200).json({
            success: true,
            message: "Su1ccessfully Deleted Bills Type"
            
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})


// For Meters

router.post('/addmetercat', [
    body('meterType', "Plaese Fill the field").notEmpty()
], isAuthenticate, async (req, res) => {
    // if there are error then send bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }

    const { meterType } = req.body;

    const chmeterType = await  MeterCat.findOne({ meterType })

    try {
        if (chmeterType) {
            res.status(400).json({ error: "Meter Type is already Exist" })
        }
        else {
            const add = await  MeterCat.create({ meterType })
            add.save();
            res.status(201).json({
                success: true,
                message: "Succefully Added"
            })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/getmetercat', isAuthenticate, async (req, res) => {
    try {
        const metercat = await  MeterCat.find({})
        res.status(200).send(metercat)
    } catch (error) {
        res.status(500).json({ success: false, Error: error.message })
    }
})


router.delete("/deletemetercat/:_id", isAuthenticate, async (req, res) => {
    try {
        const metercat = await  MeterCat.findById(req.params._id)
        if (!metercat) {
            res.status(401).json({
                success: true,
                message: "Meter Type Not Found"
            })
        }
        const deletecat = await  MeterCat.deleteOne({ _id: req.params._id })
        
        res.status(200).json({
            success: true,
            message: "Su1ccessfully Delete Meter Type"
            
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})
// For Depratment

router.post('/adddept', [
    body('deptType', "Plaese Fill the field").notEmpty()
], isAuthenticate, async (req, res) => {
    // if there are error then send bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }

    const { deptType } = req.body;

    const chdeptType = await  Dept.findOne({ deptType })

    try {
        if (chdeptType) {
             return res.status(400).json({ error: "Depratment is already Exist" })
        }
        else {
            const add = await  Dept.create({ deptType })
            add.save();
            res.status(201).json({
                success: true,
                message: "Succefully Added"
            })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/getdept', async (req, res) => {
    try {
        const dept = await  Dept.find({})
        res.status(200).send(dept)
    } catch (error) {
        res.status(500).json({ success: false, Error: error.message })
    }
})


router.delete("/deletedept/:_id", isAuthenticate, async (req, res) => {
    try {
        const dept = await  Dept.findById(req.params._id)
        if (!dept) {
             return res.status(401).json({
                success: true,
                message: "Meter Type Not Found"
            })
        }
        const deletecat = await  Dept.deleteOne({ _id: req.params._id })
        
        res.status(200).json({
            success: true,
            message: "Su1ccessfully Delete Meter Type"
            
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})



module.exports = router
const { isAuthenticate } = require('../../middlewares/Adminmiddle');
const { isAuthenticatedUser } = require('../../middlewares/auth');
const UserComplaint = require('../../models/User/UserComplaint');
const express = require("express");
const { sendEmail } = require('../../middlewares/sendEmail')
const compComplete = require('../../models/Admin/compComplete')
const Employee = require('../../models/Emp/Employee');
const router = express.Router();

// For Complaint Request

router.post('/comp/req', isAuthenticatedUser, async (req, res) => {

    try {
        const complaint = await UserComplaint.create(req.body)
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

// For Get Complaint Request 
router.get('/getComp/req', isAuthenticate, async (req, res) => {

    try {
        const complaint = await UserComplaint.find({ status: "Requested" })
        res.status(200).send(complaint)
    } catch (error) {
        res
            .status(500)
            .json({ success: false, Error: error.message })
    }
})

// For Accept complaint
router.post('/acceptcomplaint/:_id', isAuthenticate, async (req, res) => {
    try {
        const complaint = await UserComplaint.findById(req.params._id)
        if (!complaint) {
            res.status(401).json({ message: "Complaint Not Found" })
        }
        complaint.status = "Accepted"
        await complaint.save()
        res.status(200).json({
            success: true,
            message: "Accepted Complaint"
        })
        const message = " your Complaint is Accepted..."
        await sendEmail({
            email: complaint.email,
            subject: "Complaint Accepted...",
            message
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

// For Reject complaint
router.delete("/rejectcomplaint/:_id", isAuthenticate, async (req, res) => {
    const complaint = await UserComplaint.findById(req.params._id)
    if (!complaint) {
        res.status(401).json({ message: "Complaint not Found" })
    }
    const rejcomplaint = await UserComplaint.deleteOne({ _id: req.params._id })
    const message = " your Complaint is Rejected Due TO Some Reason..."
    res.status(200).json({
        success: true,
        message: "Successfully Rejected Complaint"
    })
    await sendEmail({
        email: complaint.email,
        subject: "Complaint Rejected...",
        message
    });

})

// for get accpted complaint
router.get('/acceptedcom', isAuthenticate, async (req, res) => {

    try {
        const complaint = await UserComplaint.find({ status: "Accepted" })
        if (!complaint) {
            res.status(401).json({ message: "Complaint Not Found" })
        }

        res.status(200).send(complaint)
    } catch (error) {
        res
            .status(500)
            .json({ success: false, Error: error.message })
    }
})


// FOr load Complaint
router.get("/compdata/:_id", async (req, res) => {

    try {
        const comp = await UserComplaint.findById(req.params._id)
        res.status(200).json(comp)
    } catch (error) {
        res
            .status(500)
            .json({ success: false, Error: error.message })
    }
})


router.post("/assigncom", async (req, res) => {
    try {
       
         const complaint = await UserComplaint.findById(req.body.compId)
         const emp = await Employee.findById(req.body.empId )
        emp.complaints.push(complaint)
        await emp.save()
        complaint.status = "asign"
        await complaint.save()
        
    } catch (error) {
        res
            .status(500)
            .json({ success: false, Error: error.message })
    }
})


router.get("/getAssignComp",  async (req, res) => {
    try {
        const  assignComp = await UserComplaint.find({status:"asign"})
        res.send(assignComp)
    } catch (error) {
        res.status(400).json(error.message)
    }
}
)




router.get("/compComplete", async (req, res) => {
    try {
       
         const complaint = await compComplete.find({})
         if (!complaint) {
            res.status(401).json({ message: "Complaint Not Found" })
        }
        res.status(200).json({
            complaint
        })

    } catch (error) {

    }
})


module.exports = router
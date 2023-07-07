const express = require("express");
const router = express.Router();
const { isAuthenticate } = require("../../middlewares/Adminmiddle");
const Employee = require("../../models/Emp/Employee");

const { sendEmail } = require('../../middlewares/sendEmail')

// For Get Register Employee Request
router.get("/gettempemp", isAuthenticate, async (req, res) => {
    try {
        const employee = await Employee.find({ request: true })
        if (!employee) {
            return res.status(404).json({ message: "Employee Not Find" })
        }
        else {
            res.status(200).json(employee)
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// For Comfirm Employee Request
router.post("/employee/:_id", isAuthenticate, async (req, res) => {
    try {
        const emp = await Employee.findById(req.params._id)
        if (!emp) {
            return res.status(400).json({ message: "Employee Not Found" })
        }
        else {
            emp.request = false
            await emp.save();
            res.status(200).
                json({
                    success: true,
                    message: "successfully confirmed Employee",
                })
            const message = `Your Request for register is accepted now you can login`
            await sendEmail({
                email: emp.email,
                subject: "Request for registraiton  Accepted...",
                message
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
})

// For Reject Request
router.delete("/rejectemp/:_id", isAuthenticate, async (req, res) => {
    try {
        const emp = await Employee.findById(req.params._id)
        if (!emp) {
            return res.status(400).json({ message: "Employee Not Found" })
        }
        const rejectemp = await Employee.deleteOne({ _id: req.params._id })

        res.status(200).json({
            success: true,
            message: "Su1ccessfully Rejected Employee"

        })
        const message = `Your Request for register is rejected due to some reason`
        await sendEmail({
            email: emp.email,
            subject: "Request for registraiton  Rejected...",
            message
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
// For Get Confirm Employee Data
router.get("/getemp", isAuthenticate, async (req, res) => {
    try {
        const employee = await Employee.find({ request: false, status: undefined })
        if (!employee) {
            return res.status(404).json({ message: "Employee Not Find" })
        }
        return res.status(200).json(employee)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// For Block Employee 
router.post("/blockemp/:_id", isAuthenticate, async (req, res) => {
    try {
        const emp = await Employee.findById(req.params._id)
        if (!emp) {
            return res.status(200).json({ message: "Employee Not Found" })
        }

        emp.status = "block"
        await emp.save();
        res.status(200).
            json({
                success: true,
                message: "successfully Blocked",

            })
        const message = `Your Are block due to some reason`
        await sendEmail({
            email: emp.email,
            subject: "Block...",
            message
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// For get Block Employee datails
router.get("/getblkemp", isAuthenticate, async (req, res) => {
    try {
        const blkemployee = await Employee.find({ status: "block" })
        if (!blkemployee) {
            return res.status(404).json({ message: "Employee Not Find" })
        }
        else {
            res.status(200).json(blkemployee)
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// For Unblock Employee
router.post("/unblockemp/:_id", isAuthenticate, async (req, res) => {
    try {
        const blkemp = await Employee.findById(req.params._id)


        if (!blkemp) {
            return res.status(400).json({ message: "Employee Not Found" })
        }
        else {
            blkemp.status = undefined
            await blkemp.save()
            res.status(200).
                json({
                    success: true,
                    message: "successfully Unblocked",
                })
        }
        const message = `Your Are Unblock`
        await sendEmail({
            email: blkemp.email,
            subject: "Unblock...",
            message
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// For display department wise

router.get("/deptwise", isAuthenticate, async (req, res) => {
    try {
        const dep = req.query.d;
        if (!dep) {
            return res.status(401).json({ message: "dept not found" })
        }
        const deptwise = await Employee.find({ dept: dep, request: false, status: undefined })
        res.status(200).
            json(deptwise)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router


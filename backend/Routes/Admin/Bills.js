const express = require("express");
const { isAuthenticate } = require('../../middlewares/Adminmiddle');
const Bills = require("../../models/Admin/Bills");
const UserModel = require("../../models/User/UserModel");
const { isAuthenticatedUser } = require("../../middlewares/auth");
const { sendEmail } = require("../../middlewares/sendEmail");
const router = express.Router();

// FOr Add Bills
router.post("/addbills", async (req, res) => {
    try {
        const { billType, ownerName, tenamentNo, streetAddress, area, amount } = req.body;
        const findBill = await Bills.find({ tenamentNo: tenamentNo, billType, status: "Pending" })

        if (findBill[0]) {

            findBill[0].status = "UnPaid"
            findBill[0].save();
            const create = {
                billType, ownerName, tenamentNo, streetAddress, area, amount,
                status: "Pending",
                pastDueAmt: findBill[0].totelAmt,
                totelAmt: findBill[0].totelAmt + amount,

            }
            const bill = await Bills.create(create)
            console.log(true)
            return
        }

        const create = {
            billType, ownerName, tenamentNo, streetAddress, area, amount,
            status: "Pending",
            pastDueAmt: 00,
            totelAmt: amount,
        }
        const bill = await Bills.create(create)

        console.log(false)
    } catch (error) {
        res
            .status(500)
            .json({ success: false, Error: error.message })
    }
})

// FOr Get PEnding BIlls 
router.get("/getpendingbill", async (req, res) => {
    try {
        const bill = await Bills.find({ status: "Pending" })

        res.status(200).json(bill)

        console.log(bill)
    } catch (error) {
        res
            .status(500)
            .json({ success: false, Error: error.message })
    }
})
// For Paid Bills
router.get("/getpaidbill", async (req, res) => {
    try {
        const bill = await Bills.find({ status: "Paid" })
        res.status(200).json(bill)
    } catch (error) {
        res
            .status(500)
            .json({ success: false, Error: error.message })
    }
})
// For Paying Bill

router.post('/paybills/:id',  isAuthenticatedUser , async (req, res) => {
    try {
        const bills = await Bills.findById(req.params.id)
        const User = req.user 
        if (!bills) {
            return res.status(401).json({ message: "Bills Not Found" })
        }
        if (!User) {
            return res.status(401).json({ message: "User Not Found" })
        }
        console.log(bills)
        console.log(User)
        const randomNum = Math.floor(Math.random() * 999999) + 1;
        const message = `Paymetn id for reciept download:${randomNum}`
        User.paidBills.push(bills)
        await User.save()
        bills.status = "Paid"
        bills.paymentId = randomNum
        await bills.save()

        await sendEmail({
            email: User.email,
            subject: "Payment successful",
            message
        });
     
        res.status(200).redirect('http://localhost:3000/BillReciept')
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})


// For Search Bill
router.post("/searchbills", async (req, res) => {
    try {
        const tenamentNo = req.body.tno;
        const billType = req.body.billType

        const bill = await Bills.find({ tenamentNo, billType, status: "Pending" })

        if (bill < 1) {
            return res
                .status(404)
                .json({ message: "Invalid Input Enterd or No bill due.... " })
        }
        res.status(200).send(bill.reverse())
    } catch (error) {

        res.status(500).json({
            error: error.message
        })
    }
})

router.get("/searchbill/:id", async (req, res) => {
    try {
       
        const bill = await Bills.find({paymentId:req.params.id}) 
        if (!bill[0]) {
            return res
                .status(404)
                .json({ message: "Invalid Input Enterd or Bill Not Found.. " })
        }
        res.status(200).send(bill)
    } catch (error) {

        res.status(500).json({
            error: error.message
        })
    }
})


module.exports = router
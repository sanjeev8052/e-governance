const express = require('express')
const { instance } = require('../app');
const Bills = require('../models/Admin/Bills');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = express.Router()

router.post('/checkout', async (req, res) => {
    try {
        var options = {
            amount:50000  ,// amount in the smallest currency unit
            currency: "INR",
        };
        const payment = await instance.orders.create(options);
        console.log(payment)
        res.status(200).json({
            success: true,
            payment
        })

    } catch (error) {
        console.log(error)
    }
})

router.post('/paymentVerification/:id', isAuthenticatedUser ,  async (req, res) => {
    try {
        const bills = await Bills.findById(req.params)
        const User = req.user 
        if (!bills) {
            return res.status(401).json({ message: "Bills Not Found" })
        }
        if (!User) {
            return res.status(401).json({ message: "User Not Found" })
        }

        const randomNum = Math.floor(Math.random() * 999999) + 1;
        const message = `Paymetn id for reciept download:${randomNum}`
        User.paidBills.push(bills)
        await User.save()
        bills.status = "Paid"
        bills.paymentId = randomNum
        await bills.save()

        await sendEmail({
            email: complaint.email,
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


module.exports = router

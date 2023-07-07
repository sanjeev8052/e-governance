const express = require('express');
const Feedback = require('../../models/User/Feedback');
const router = express.Router();

router.post('/addfeeback', async (req,res) => { 
    try {
        const { name ,feedback} = req.body
        const feedbacks = new Feedback({ name, feedback  })

        await feedbacks.save();
        res.status(201).json({ msg: "Feedback Added" });
        
    } catch (error) {
        res
        .status(500)
        .json({ success: false, Error: error.message })
    }
 })

 router.get("/getfeedback", async (req,res) => { 
    try {
        const feedback = await Feedback.find({})
        res.status(200).send(feedback)
    } catch (error) {
        res
            .status(500)
            .json({ success: false, Error: error.message })
    }
 })

router.delete("/delfeedback", async (req,res) => { 
    try {
        
    } catch (error) {
        res.status(500)
        .json({ success: false, Error: error.message })
    }
 })
 module.exports = router
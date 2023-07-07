const express = require("express");
const { isAuthenticate } = require('../../middlewares/Adminmiddle');
const Bills = require("../../models/Admin/Bills");
const Employee = require("../../models/Emp/Employee");
const Cast = require("../../models/Services/CastCer");
const Income = require("../../models/Services/IncomeCer");
const UserComplaint = require("../../models/User/UserComplaint");
const UserModel = require("../../models/User/UserModel");
const MeterApply = require("../../models/Services/MeterApply");
const router = express.Router();

router.get('/countuser' , async (req,res) => { 
    const user = await UserModel.find({})

    const count = user.length;
    res.status(200).json(count)
 })
router.get('/countblockuser' , async (req,res) => { 
    const user = await UserModel.find({ status:"block"})

    const count = user.length;
    res.status(200).json(count)
 })
router.get('/countrequestemployee' , async (req,res) => { 
    const emp = await Employee.find({ request:true })

    const count = emp.length;
    res.status(200).json(count)
 })
router.get('/countemployee' , async (req,res) => { 
    const emp = await Employee.find({ request:false , status: undefined})

    const count = emp.length;
    res.status(200).json(count)
 })
router.get('/countblkemployee' , async (req,res) => { 
    const emp = await Employee.find({ request:false , status: "block"})

    const count = emp.length;
    res.status(200).json(count)
 })
router.get('/countcomplaint' , async (req,res) => { 
    const emp = await UserComplaint.find({ status: "Requested"})

    const count = emp.length;
    res.status(200).json(count)
 })
router.get('/countacccomplaint' , async (req,res) => { 
    const emp = await UserComplaint.find({ status: "Accepted"})

    const count = emp.length;
    res.status(200).json(count)
 })
router.get('/countcompletecomplaint' , async (req,res) => { 
    const emp = await UserComplaint.find({ status: "complete"})

    const count = emp.length;
    res.status(200).json(count)
 })
router.get('/countpenbills' , async (req,res) => { 
    const emp = await Bills.find({ status: "Pending"})

    const count = emp.length;
    res.status(200).json(count)
 })
router.get('/countpaidbills' , async (req,res) => { 
    const emp = await Bills.find({ status: "Paid"})

    const count = emp.length;
    res.status(200).json(count)
 })

router.get('/countreqincome' , async (req,res) => { 
    const emp = await Income.find({ status: "Requested"})

    const count = emp.length;
    res.status(200).json(count)
 })

router.get('/countaccincome' , async (req,res) => { 
    const emp = await Income.find({ status: "Accepted"})

    const count = emp.length;
    res.status(200).json(count)
 })
router.get('/countreqcast' , async (req,res) => { 
    const emp = await Cast.find({ status: "Requested"})

    const count = emp.length;
    res.status(200).json(count)
 })

router.get('/countacccast' , async (req,res) => { 
    const emp = await Cast.find({ status: "Accepted"})

    const count = emp.length;
    res.status(200).json(count)
 })
router.get('/countreqmeter' , async (req,res) => { 
    const emp = await MeterApply.find({ status: "Requested"})

    const count = emp.length;
    res.status(200).json(count)
 })

router.get('/countaccmeter' , async (req,res) => { 
    const emp = await MeterApply.find({ status: "Accepted"})

    const count = emp.length;
    res.status(200).json(count)
 })



module.exports = router
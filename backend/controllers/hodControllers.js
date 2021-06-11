const Hod = require("../models/Hod")
const Outing = require("../models/Outing")
const bcryptjs = require("bcryptjs")
const User = require("../models/User") 
const jwt=require("jsonwebtoken")

const config = require("config")
const jwt_secret = config.get("JWT_SECRET")

//Add new HOD
const addHod =async (req,res)=>{
    const {email,password,department}=req.body
    if(!email||!password||!department){
        return res.status(400).json({msg:"All fields are required"})
    }
    let salt=await bcryptjs.genSalt(10);
    let hashed_password = await bcryptjs.hash(password,salt)
    const hod = await Hod.create({
        email,
        department,
        password:hashed_password
    })
    if(hod){
        res.status(201).json({hod})
    }else{
        res.status(400).json({msg:"Hod adding failed"})
    }
    // res.send("Hod routes testing")
    
}

//Login HOD
const loginHod = async(req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        return res.status(400).json({msg:"All fields are required"})
    }
    const hod = await Hod.findOne({email})
    if(!hod){
        return res.status(400).json({msg:"Invalid Credentials"})
    }

    let isMatchPassword = await bcryptjs.compare(password,hod.password)
    if(!isMatchPassword){
        return res.status(400).json({msg:"Invalid Credentials"})
    }else{
        const payload={
            email,
            isAdmin:hod.isadmin,
            id:hod._id
        }
        const token = await jwt.sign(payload,jwt_secret)
        return res.json({
            _id:hod._id,
            isadmin:hod.isadmin,
            token,
            email
        })
    }

}



// Get all students in respective Department
const allDepartmentUsers = async(req,res)=>{
    const hodId = req.user 
    const hod = await Hod.findById(hodId).select("-password")
    const departmentUsers = await User.find({department:hod.department}).select("-password")
    if(departmentUsers){
        return res.status(200).json(departmentUsers)
    }else{
        return res.status(400).json({msg:"Unable to get al Users"})
    }
}

// Get all outings 
const allDepartmentOutings = async(req,res)=>{
    const hodId = req.user 
    const hod = await Hod.findById(hodId).select("-password")
    const departmentUsers = await User.find({department:hod.department})
    const presentOutings = await Outing.find({process:1,department:hod.department})
    if(presentOutings){
        return res.status(200).json(presentOutings)
    }else{
        return res.status(400).json({msg:"Unable to get Current Outings"})
    }
}


// Approve Outing
const approveHodOuting = async(req,res)=>{
    const {outingId} = req.params
    let outing = await Outing.findById(outingId)
    outing.hod=1
    await outing.save()
    //console.log(outing)
    if(outing.hod===1){
        return res.json(outing)
    }else{
        return res.status(400).json({msg:"Unable to approve outing"})
    }
}

// Reject Outing
const rejectHodOuting = async(req,res)=>{
    const {outingId} = req.params
    let outing = await Outing.findById(outingId)
    outing.hod=0
    outing.process=0
    await outing.save()
    //console.log(outing)
    if(outing.hod===0){
        return res.json(outing)
    }else{
        return res.status(400).json({msg:"Unable to reject outing"})
    }
}



// Change HOD Password
const changeHodPassword = async(req,res)=>{
    const {new_password} = req.body
    const hodId = req.user
    const hod = await Hod.findById(hodId).select("-password")
    const salt = await bcryptjs.genSalt(10)
    const hashed_password = await bcryptjs.hash(new_password,salt)
    hod.password = hashed_password
    const newPasswordUser = await hod.save()
    if(newPasswordUser){
        return res.status(200).json({msg:"Password Changed Successfully"})
    }else{
        return res.status(400).json({msg:"Unable to change password"})
    }
}




module.exports={
    addHod,
    loginHod,
    allDepartmentOutings,
    allDepartmentUsers,
    approveHodOuting,
    rejectHodOuting,
    changeHodPassword
}
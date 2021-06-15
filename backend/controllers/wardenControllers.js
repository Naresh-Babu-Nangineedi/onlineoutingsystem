const Warden = require("../models/Warden")
const Hod = require("../models/Hod")
const bcryptjs = require("bcryptjs")
const User = require("../models/User")
const HostelIncharge = require("../models/HostelIncharge")
const jwt = require("jsonwebtoken")
const config = require("config")
const Outing = require("../models/Outing")
const jwt_secret = config.get("JWT_SECRET")



//Add new Warden
const addWarden =async (req,res)=>{
    const {email,password,gender}=req.body
    let salt=await bcryptjs.genSalt(10);
    let hashed_password = await bcryptjs.hash(password,salt)
    const warden = await Warden.create({
        email,
        gender,
        password:hashed_password
    })
    if(warden){
        res.status(201).json(warden)
    }else{
        res.status(400).json({msg:"Hostel Warden adding failed"})
    }
    
}

//Login Warden
const loginWarden = async(req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        return res.status(400).json({msg:"All fields are required"})
    }
    const warden = await Warden.findOne({email})
    if(!warden){
        return res.status(400).json({msg:"Invalid Credentials"})
    }

    let isMatchPassword = await bcryptjs.compare(password,warden.password)
    if(!isMatchPassword){
        return res.status(400).json({msg:"Invalid Credentials"})
    }else{
        const payload={
            email,
            isAdmin:warden.isadmin,
            id:warden._id
        }
        const token = await jwt.sign(payload,jwt_secret)
        return res.json({
            _id:warden._id,
            isadmin:warden.isadmin,
            token,
            email
        })
    }
}


// Get all HOD approved and Hostel Incharge outings and gender based
const allGenderOutings = async(req,res)=>{
    const wardenId = req.user 
    const warden = await Warden.findById(wardenId).select("-password")
    const presentOutings = await Outing.find({process:1,hod:1,incharge:1,gender:warden.gender})
    if(presentOutings){
        return res.status(200).json(presentOutings)
    }else{
        return res.status(400).json({msg:"Unable to get Current Outings"})
    }
}

// Approve Warden Outing
const approveWardenOuting = async(req,res)=>{
    const {outingId} = req.params
    let outing = await Outing.findById(outingId)
    outing.warden=1
    outing.hod = 0
    outing.incharge = 0
    outing.process = 0
    await outing.save()
    if(outing.warden===1){
        return res.json(outing)
    }else{
        return res.status(400).json({msg:"Unable to approve outing"})
    }
}

// Reject Warden Outing
const rejectWardenOuting = async(req,res)=>{
    const {outingId} = req.params
    const {rejectreason} = req.body
    let outing = await Outing.findById(outingId)
    outing.warden=0
    outing.hod=0
    outing.incharge=0
    outing.rejectby = "Warden"
    outing.rejectreason = rejectreason
    await outing.save()
    if(outing.warden===0){
        return res.json(outing)
    }else{
        return res.status(400).json({msg:"Unable to reject outing"})
    }
}



// Change Warden Password
const changeWardenPassword = async(req,res)=>{
    const {new_password} = req.body
    const wardenId = req.user
    const warden = await Warden.findById(wardenId).select("-password")
    const salt = await bcryptjs.genSalt(10)
    const hashed_password = await bcryptjs.hash(new_password,salt)
    warden.password = hashed_password
    const newPasswordUser = await warden.save()
    if(newPasswordUser){
        return res.status(200).json({msg:"Password Changed Successfully"})
    }else{
        return res.status(400).json({msg:"Unable to change password"})
    }
}


module.exports={
    addWarden,
    loginWarden,
    allGenderOutings,
    approveWardenOuting,
    rejectWardenOuting,
    changeWardenPassword
}
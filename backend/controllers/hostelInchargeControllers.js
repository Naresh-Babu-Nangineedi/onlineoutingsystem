const Hod = require("../models/Hod")
const bcryptjs = require("bcryptjs")
const User = require("../models/User")
const HostelIncharge = require("../models/HostelIncharge")
const jwt = require("jsonwebtoken")
const config = require("config")
const Outing = require("../models/Outing")

const jwt_secret = config.get("JWT_SECRET")



// Add New Student
const addStudent = async(req,res)=>{

    const {firstname,lastname,parentmobile,department,year,gender,email,regno,mobile,section,address,bloodgroup,parent,outingtype,hostelname}=req.body

    if(!firstname||!lastname||!parentmobile||!department||!year||!gender||!email||!regno||!mobile||!section||!address||!bloodgroup||!parent||!outingtype||!hostelname){
        return res.status(400).json({msg:"All fields are required"})
    }

    let studentExists = await User.findOne({regno})
    if(studentExists){
        return res.status(400).json({msg:"Student already exists"})
    }

    let salt=await bcryptjs.genSalt(10);
    let hashed_password = await bcryptjs.hash("Vishnu123$",salt)

    const user = await User.create({
        firstname,
        lastname,
        department,
        year,
        gender,
        parentmobile,
        email,
        regno,
        mobile,
        section,
        address,
        bloodgroup,
        parent,
        outingtype,
        hostelname,
        password:hashed_password
    })

    if(user){
        res.status(201).json({
           user
        })
    }else{
        res.status(400).json({msg:"Unable to add student"})
    }

}

// Update User
const updateUser=async(req,res)=>{
    const inchargeId = req.user
    const userId = req.params.userId
    const {firstname,parentMobile,lastname,department,year,gender,email,regno,mobile,section,address,bloodgroup,parent,outingtype,hostelname}=req.body
    const newUser={}
    if(firstname) newUser.firstname=firstname
    if(lastname) newUser.lastname=lastname
    if(department) newUser.department=department
    if(year) newUser.year=year
    if(gender) newUser.gender=gender
    if(email) newUser.email=email
    if(regno) newUser.regno=regno
    if(mobile) newUser.mobile=mobile
    if(section) newUser.section=section
    if(address) newUser.address=address
    if(bloodgroup) newUser.bloodgroup=bloodgroup
    if(parent) newUser.parent=parent
    if(outingtype) newUser.outingtype=outingtype
    if(hostelname) newUser.hostelname=hostelname
    if(parentMobile) newUser.parentMobile=parentMobile
    //console.log(newUser)
   // console.log(userId)
    try {
        let user = await User.findById(userId).select("-password")
       // console.log(user)
        if(!user) return res.status(404).json({msg:"User not found"})
        user = await User.findByIdAndUpdate(userId,{$set:newUser},{new:true})
        return res.status(200).json(user)  
    } catch (err) {
        return res.status(400).json({msg:"Error occurs at backend"})
    }

}


// Delete User
const deleteUser=async(req,res)=>{
    const {userId}=req.params
    try {
        let user = await User.findById(userId).select("-password")
        if(!user) return res.status(404).json({msg:"User not found"})
        await User.findByIdAndRemove(userId)
        return res.status(200).json({msg:"User Deleted Successfully"})
    } catch (err) {
        return res.status(400).json({msg:"Error occurs at backend"})
    }
}


//Add new Incharge
const addIncharge =async (req,res)=>{
    const {email,password,gender}=req.body
    let salt=await bcryptjs.genSalt(10);
    let hashed_password = await bcryptjs.hash(password,salt)
    const hostelIncharge = await HostelIncharge.create({
        email,
        gender,
        password:hashed_password
    })
    if(hostelIncharge){
        res.status(201).json({hostelIncharge})
    }else{
        res.status(400).json({msg:"Hostel Incharge adding failed"})
    }
    
}


//Login Incharge
const loginIncharge = async(req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        return res.status(400).json({msg:"All fields are required"})
    }
    const incharge = await HostelIncharge.findOne({email})
    if(!incharge){
        return res.status(400).json({msg:"Invalid Credentials"})
    }

    let isMatchPassword = await bcryptjs.compare(password,incharge.password)
    if(!isMatchPassword){
        return res.status(400).json({msg:"Invalid Credentials"})
    }else{
        const payload={
            email,
            isAdmin:incharge.isadmin,
            id:incharge._id
        }
        const token = await jwt.sign(payload,jwt_secret)
        return res.json({
            _id:incharge._id,
            isadmin:incharge.isadmin,
            token,
            email
        })
    }
}


// Get all HOD approved outings and gender based
const allGenderOutings = async(req,res)=>{
    const inchargeId = req.user 
    const incharge = await HostelIncharge.findById(inchargeId).select("-password")
    // const departmentUsers = await User.find({department:hod.department})
    const presentOutings = await Outing.find({process:1,hod:1,gender:incharge.gender})
    if(presentOutings){
        return res.status(200).json(presentOutings)
    }else{
        return res.status(400).json({msg:"Unable to get Current Outings"})
    }
}


// Approve Incharge Outing
const approveInchargeOuting = async(req,res)=>{
    const {outingId} = req.params
    let outing = await Outing.findById(outingId)
    outing.incharge=1
    await outing.save()
    //console.log(outing)
    if(outing.incharge===1){
        return res.json(outing)
    }else{
        return res.status(400).json({msg:"Unable to approve outing"})
    }
}

// Reject Incharge Outing
const rejectInchargeOuting = async(req,res)=>{
    const {outingId} = req.params
    let outing = await Outing.findById(outingId)
    outing.incharge=2
    await outing.save()
    //console.log(outing)
    if(outing.incharge===2){
        return res.json(outing)
    }else{
        return res.status(400).json({msg:"Unable to reject outing"})
    }
}


// Change Incharge Password
const changeInchargePassword = async(req,res)=>{
    const {new_password} = req.body
    const inchargeId = req.user
    const incharge = await HostelIncharge.findById(inchargeId).select("-password")
    const salt = await bcryptjs.genSalt(10)
    const hashed_password = await bcryptjs.hash(new_password,salt)
    incharge.password = hashed_password
    const newPasswordUser = await incharge.save()
    if(newPasswordUser){
        return res.status(200).json({msg:"Password Changed Successfully"})
    }else{
        return res.status(400).json({msg:"Unable to change password"})
    }
}



module.exports={
    addStudent,
    addIncharge,
    loginIncharge,
    allGenderOutings,
    approveInchargeOuting,
    rejectInchargeOuting,
    updateUser,
    deleteUser,
    changeInchargePassword
}
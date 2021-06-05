const Hod = require("../models/Hod")
const bcryptjs = require("bcryptjs")
const User = require("../models/User")
const HostelIncharge = require("../models/HostelIncharge")
const jwt = require("jsonwebtoken")
const config = require("config")

const jwt_secret = config.get("JWT_SECRET")



// Add New Student
const addStudent = async(req,res)=>{

    const {firstname,lastname,department,year,gender,email,regno,mobile,section,address,bloodgroup,parent,outingtype,hostelname}=req.body

    if(!firstname||!lastname||!department||!year||!gender||!email||!regno||!mobile||!section||!address||!bloodgroup||!parent||!outingtype||!hostelname){
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



module.exports={
    addStudent,
    addIncharge,
    loginIncharge
}
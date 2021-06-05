const Hod = require("../models/Hod")
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



module.exports={
    addHod,
    loginHod
}
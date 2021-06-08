const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")
const Outing = require("../models/Outing")
const jwt_secret = config.get("JWT_SECRET")

// User Login
const loginUser = async(req,res)=>{
    const {regno,password}=req.body
    //console.log(regno)
    if(!regno||!password){
        return res.status(400).json({msg:"All fields are required"})
    }
    const user = await User.findOne({regno})
    if(!user){
        return res.status(400).json({msg:"Invalid Credentials"})
    }

    let isMatchPassword = await bcryptjs.compare(password,user.password)
    if(!isMatchPassword){
        return res.status(400).json({msg:"Invalid Credentials"})
    }else{
        const payload={
            regno,
            isAdmin:user.isadmin,
            id:user._id
        }
        const token = await jwt.sign(payload,jwt_secret)
        return res.json({
            _id:user._id,
            isadmin:user.isadmin,
            token,
            regno
        })
    }
}


// Change User Password
const changeUserPassword = async(req,res)=>{
    const {new_password} = req.body
    const userId = req.user
    const user = await User.findById(userId).select("-password")
    const salt = await bcryptjs.genSalt(10)
    const hashed_password = await bcryptjs.hash(new_password,salt)
    user.password = hashed_password
    const newPasswordUser = await user.save()
    if(newPasswordUser){
        return res.status(200).json({msg:"Password Changed Successfully"})
    }else{
        return res.status(400).json({msg:"Unable to change password"})
    }
}

// My Outings
const allUserOutings = async(req,res)=>{
    const userId = req.user 
    const user = await User.findById(userId).select("-password")
    const myOutings = await Outing.find({userId})
    if(myOutings){
        return res.status(200).json(myOutings)
    }else{
        return res.status(400).json({msg:"Unable to get your outings"})
    }
}



module.exports={loginUser,changeUserPassword,allUserOutings}
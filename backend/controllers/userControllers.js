const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")

const jwt_secret = config.get("JWT_SECRET")

// User Login
const loginUser = async(req,res)=>{
    const {regno,password}=req.body
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


module.exports={loginUser}
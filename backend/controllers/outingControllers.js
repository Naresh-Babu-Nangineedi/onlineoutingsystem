const User = require("../models/User")
const Outing = require("../models/Outing")


const applyOuting = async(req,res)=>{
    const {reason,reasontype,from,to} = req.body
    const userId = req.user.id 
    // console.log(userId)
    if(!reason||!reasontype||!from||!to){
        return res.status(400).json({msg:"All fields are required"})
    }
    let user = await User.findById(userId).select("-password")
    if(!user){
        return res.status(404).json({msg:"User not found"})
    }
    let outingUser = await Outing.findOne({userId})
    // console.log(outingUser)
    if(user.outing===true||outingUser){
        return res.status(400).json({msg:"User already in outing"})
    }
    const outing = await Outing.create({
        reason,
        reasontype,
        from,
        to,
        userId
    })
    if(outing){
        res.status(201).json({outing})
    }else{
        return res.status(400).json({msg:"Error to apply outing"})
    }
}

module.exports = {applyOuting}
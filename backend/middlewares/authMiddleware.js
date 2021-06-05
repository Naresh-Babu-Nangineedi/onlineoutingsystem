const jwt = require("jsonwebtoken")
const HostelIncharge = require("../models/HostelIncharge")
const config = require("config")

const jwt_secret = config.get("JWT_SECRET")



// LoggedIn or not
const isInchargeLogin=async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        try {
            token=req.headers.authorization
            const decoded = jwt.verify(token,jwt_secret)
            req.user = await HostelIncharge.findById(decoded.id).select("-password")
            next()
            
        } catch (err) {
            console.error(err.message)
            return res.status(401).json({msg:"Not Authorized"})
        }
    }
    if(!token){
        return res.status(401).json({msg:"Not Authorized, token not found"})
    }
}


// Check user is incharge
const isIncharge = async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        try {
            token = req.headers.authorization
            const decoded = jwt.verify(token,jwt_secret)
            // console.log(decoded)
            req.user = await HostelIncharge.findById(decoded.id).select("-password")
            // console.log(req.user)
            if(req.user.isadmin===3){
                next()
            }else{
                return res.status(401).json({msg:"Not Authorized, You are not a Hostel Incharge"})
            }

        } catch (err) {
            console.error(err.message)
            return res.status(401).json({msg:"Not Authorized"})
        }
    }
    if(!token){
        return res.status(401).json({msg:"Not Authorized, token not found"})
    }

}

module.exports={isIncharge,isInchargeLogin}
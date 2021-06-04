import jwt from "jsonwebtoken"
import HostelIncharge from "../models/HostelIncharge"


const isIncharge = async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        try {
            token = req.headers.authorization
            
            
        } catch (err) {
            
        }
    }

}
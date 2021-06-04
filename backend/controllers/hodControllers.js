const Hod = require("../models/Hod")
const bcryptjs = require("bcryptjs")
const User = require("../models/User")


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
            msg:"Student added Successfully"
        })
    }else{
        res.status(400).json({msg:"Unable to add student"})
    }

}



module.exports={
    addStudent
}
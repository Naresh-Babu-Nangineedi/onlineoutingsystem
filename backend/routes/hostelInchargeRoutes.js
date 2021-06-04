const express = require('express')

const {addIncharge,addStudent,loginIncharge}=require("../controllers/hostelInchargeControllers")


const router = express.Router()


router.route("/addIncharge").post(addIncharge)
router.route("/login").post(loginIncharge)



module.exports=router
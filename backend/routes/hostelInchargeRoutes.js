const express = require('express')

const {addIncharge,addStudent,loginIncharge}=require("../controllers/hostelInchargeControllers")
const {isIncharge,isInchargeLogin}=require("../middlewares/authMiddleware")

const router = express.Router()


router.route("/addIncharge").post(addIncharge)
router.route("/login").post(loginIncharge)
router.route("/addStudent").post(isInchargeLogin,isIncharge,addStudent)



module.exports=router
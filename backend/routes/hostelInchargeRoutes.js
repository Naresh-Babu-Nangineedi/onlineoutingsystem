const express = require('express')

const {addIncharge,addStudent,loginIncharge}=require("../controllers/hostelInchargeControllers")
const {isIncharge,isInchargeLogin}=require("../middlewares/authMiddleware")
const {getUserOutings}=require("../controllers/outingControllers")

const router = express.Router()


router.route("/addIncharge").post(addIncharge)
router.route("/login").post(loginIncharge)
router.route("/addStudent").post(isInchargeLogin,isIncharge,addStudent)
router.route("/user/outing/:regno").get(isInchargeLogin,isIncharge,getUserOutings)



module.exports=router
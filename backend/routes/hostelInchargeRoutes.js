const express = require('express')

const {addIncharge,addStudent,loginIncharge,allGenderOutings,approveInchargeOuting,rejectInchargeOuting,updateUser,deleteUser}=require("../controllers/hostelInchargeControllers")
const {isIncharge,isInchargeLogin}=require("../middlewares/authMiddleware")
const {getUserOutings}=require("../controllers/outingControllers")

const router = express.Router()


router.route("/addIncharge").post(addIncharge)
router.route("/login").post(loginIncharge)
router.route("/addStudent").post(isInchargeLogin,isIncharge,addStudent)
router.route("/update/:userId").put(isInchargeLogin,isIncharge,updateUser)
router.route("/delete/:userId").delete(isInchargeLogin,isIncharge,deleteUser)
router.route("/user/outing/:regno").get(isInchargeLogin,isIncharge,getUserOutings)
router.route("/all_outings").get(isInchargeLogin,isIncharge,allGenderOutings)
router.route("/approve/:outingId").post(isInchargeLogin,isIncharge,approveInchargeOuting)
router.route("/reject/:outingId").post(isInchargeLogin,isIncharge,rejectInchargeOuting)



module.exports=router
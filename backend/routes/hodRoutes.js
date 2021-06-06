const express = require('express')

const {addHod,loginHod,allDepartmentOutings,allDepartmentUsers,approveHodOuting,rejectHodOuting}=require("../controllers/hodControllers")
const {isIncharge,isInchargeLogin,isHod,isHodLogin}=require("../middlewares/authMiddleware")

const router = express.Router()


router.route("/addHod").post(addHod)
router.route("/login").post(loginHod)
router.route("/allOutings").get(isHodLogin,isHod,allDepartmentOutings)
router.route("/allUsers").get(isHodLogin,isHod,allDepartmentUsers)
router.route("/approve/:outingId").post(isHodLogin,isHod,approveHodOuting)
router.route("/reject/:outingId").post(isHodLogin,isHod,rejectHodOuting)
// router.route("/user/outing/:regno").get(isInchargeLogin,isIncharge,getUserOutings)



module.exports=router
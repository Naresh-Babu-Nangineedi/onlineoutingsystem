const express = require("express")

const router = express.Router()
const {addWarden,loginWarden,allGenderOutings,approveWardenOuting,rejectWardenOuting,changeWardenPassword}=require("../controllers/wardenControllers")
const {isWarden,isWardenLogin}=require("../middlewares/authMiddleware")

router.route("/addWarden").post(addWarden)
router.route("/login").post(loginWarden)
router.route("/allOutings").get(isWardenLogin,isWarden,allGenderOutings)
router.route("/change_password").post(isWardenLogin,isWarden,changeWardenPassword)
router.route("/approve/:outingId").post(isWardenLogin,isWarden,approveWardenOuting)
router.route("/reject/:outingId").post(isWardenLogin,isWarden,rejectWardenOuting)

module.exports = router

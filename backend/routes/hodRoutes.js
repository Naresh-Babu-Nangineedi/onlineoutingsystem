const express = require('express')

const {addHod,loginHod}=require("../controllers/hodControllers")
const {isIncharge,isInchargeLogin}=require("../middlewares/authMiddleware")

const router = express.Router()


router.route("/addHod").post(addHod)
router.route("/login").post(loginHod)
// router.route("/addStudent").post(isInchargeLogin,isIncharge,addStudent)
// router.route("/user/outing/:regno").get(isInchargeLogin,isIncharge,getUserOutings)



module.exports=router
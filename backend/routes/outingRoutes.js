const express = require("express")

const router = express.Router()
const {applyOuting}=require("../controllers/outingControllers")
const {isUserLogin}=require("../middlewares/authMiddleware")


router.route("/applyOuting").post(isUserLogin,applyOuting)



module.exports = router
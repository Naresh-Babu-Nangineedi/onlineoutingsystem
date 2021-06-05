const express = require("express")

const router = express.Router()
const {loginUser}=require("../controllers/userControllers")


router.route("/login").post(loginUser)



module.exports = router
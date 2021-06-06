const express = require("express")

const router = express.Router()
const {loginUser,changeUserPassword,allUserOutings}=require("../controllers/userControllers")
const {isUserLogin} = require("../middlewares/authMiddleware")

router.route("/login").post(loginUser)
router.route("/change_password").post(isUserLogin,changeUserPassword)
router.route("/my_outings").get(isUserLogin,allUserOutings)


module.exports = router
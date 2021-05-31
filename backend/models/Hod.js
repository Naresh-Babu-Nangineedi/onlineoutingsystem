const mongoose = require("mongoose");

const hodSchema = mongoose.Schema({
    department : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required: true
    },
    isadmin:{
        default:true
    }
})

const Hod = mongoose.model("Hod",hodSchema)

module.exports = Hod
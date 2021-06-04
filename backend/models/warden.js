const mongoose = require("mongoose");

const wardenschema = mongoose.Schema({
    isadmin: {
        type:Number,
        default: 1
    },
    gender:{
        type:String,
        required:true
    },
    email :{
        type : String,
        required : true
    },
    password:{
        type:String,
        required:true
    }
    
})


const Warden = mongoose.model("Warden",WardenSchema)

module.exports = Warden
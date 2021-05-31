const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type: String,
        required: true
    },
    department:{
        type:String,
        required:true
    },
    year:{
        type : String,
        required: true
    },
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
        reuired:true
    },
    regno:{
        type:String,
        reuired:true
    },
    mobile:{
        type:Number,
        reuired:true
    },
    section:{
        type:String,
        reuired:true
    },
    address:{
        doorno:{
            type:String,
            required:true
        },
        place:{
            type:String,
            required:true
        },
        pincode:{
            type:Number,
            required:true
        }
    },
    bloodgroup:{
        type:String,
        required: true
    },
    parent:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isadmin:{
        default:false
    },
    outingtype:{
        type: String,
        required: true
    },
    hostelname : {
        type : String,
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    }     
},{
    timestamp:true
})

const User = mongoose.model("User",userSchema)

module.exports=User


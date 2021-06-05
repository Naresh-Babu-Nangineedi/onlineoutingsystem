const mongoose = require("mongoose")

const outingSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    reason:{
        type:String,
        required:true
    },
    reasontype:{
        type:String,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    hod:{
        type:Boolean,
        default:false
    },
    warden:{
        type:Boolean,
        default:false
    },
    incharge:{
        type : Boolean,
        default : false
    },
    date:{
        type:Date,
        default:Date.now
    }
    
},{
    timestamp:true
})

const Outing = mongoose.model("Outing",outingSchema)

module.exports = Outing
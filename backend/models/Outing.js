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
    date:{
        type:Date,
        default:Date.now
    }
    
},{
    timestamp:true
})
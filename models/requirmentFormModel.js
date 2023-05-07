const mongoose = require("mongoose");
const requirementSchema = new mongoose.Schema(
    {
     name:{
        type:String,
        required:true
     },
     area:{
        type:String,
        required:true
     },
     institution:{
        type:String,
        required:true
     },
     category:{
        type:String,
        required:true
     },
     hours:{
        type:Number,
        required:true
     },
     file:{
        type:String,
     },
     isAppprove:{
        type:Boolean,
        default:false
     }

    }
)

module.exports = mongoose.model("Requirement",requirementSchema)
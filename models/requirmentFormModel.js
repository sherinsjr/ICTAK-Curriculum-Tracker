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
     instituion:{
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
     isApprove:{
        type:Boolean,
        default:false
     }

    }
)

module.exports = mongoose.model("Requirement",requirementSchema)
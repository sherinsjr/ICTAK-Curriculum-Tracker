const express = require("express");
const router = express.Router();
const Requirement = require("../models/requirmentFormModel");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
router.use(express.static("public"));


// multer
let stroge = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,path.join(__dirname,"../public/requirmentFile"),function(error,success){
            if (error) {
                console.log(error);
            }
            else{
                console.log("success");
            }
        })
    },
    filename:(req,file,callback)=>{
        const name = Date.now() + "-" + file.originalname
        callback(null,name,function(error,success){
            if (error) {
                console.log(error);
            }
            else{
                console.log("success");
            }
        })
    }
});

// upload
const upload = multer({storage:stroge});


// 
router.post("/create",upload.single("file"),async(req,res)=>{
    try {
        const data = new Requirement({
            name:req.body.name,
            area:req.body.area,
            instituion:req.body.instituion,
            category:req.body.category,
            hours:req.body.hours,
            file:req.body.file==""?"":req.file.filename,
            isAppprove:req.body.isAppprove
        })
        const postData = await data.save();
        res.status(201).send({
            success:true,
            message:"postData",
            data:postData
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:error.message,
        })
    }
})

module.exports  = router
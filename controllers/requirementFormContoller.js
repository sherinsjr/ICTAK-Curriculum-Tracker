const Requirement = require("../models/requirmentFormModel")

// Create Requirment --Admin
exports.createRequirement = async(req,res,next)=>{
  try {
    let requirement = new Requirement({
        name:req.body.name,
        area:req.body.area,
        instituion:req.body.instituion,
        category:req.body.category,
        hours:req.body.hours,
    })
    if(req.file){
        requirement.file = req.file.path
    }
    const postData = await requirement.save();
    res.status(201).json({
        success:true,
        message:"data posted successfully",
        data:postData
    })
  } catch (error) {
    res.status(400).json({
        success:false,
        message:error.message,
    })
  }
}

// Get All Requirement
exports.getAllRequirements = async(req,res,next)=>{
   try {
    const requirements = await Requirement.find();

    res.send(requirements).status(200);
   } catch (error) {
    res.status(400).json({
        success:false,
        message:error.message,
    })
   }
};

// Get Requirement Details
exports.getRequirementDetails = async(req,res,next)=>{
    try {
        const requirement = await Requirement.findById(req.params.id);

        res.status(200).json({
            success:true,
           requirement
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message,
        })
    }
}

// Delete Requirement
exports.deleteRequirement = async(req,res)=>{
    try {
        const id = req.params.id;
        const data= req.body;
        const deleteData = await Requirement.findOneAndDelete({"_id":id},data)
        res.status(200).json({
            success:true,
            message:"Requirement deleted successfully...!"
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}
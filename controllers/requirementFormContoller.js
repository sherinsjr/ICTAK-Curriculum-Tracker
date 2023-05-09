const Requirement = require("../models/requirmentFormModel");
const jwt = require("jsonwebtoken");
const path = require("path");

// Create Requirment --Admin
exports.createRequirement = async (req, res) => {
  // Verify and decode the token
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "mysecretkey123");
  // Check if the user is an admin
  if (decodedToken.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    let requirement = new Requirement({
      name: req.body.name,
      area: req.body.area,
      institution: req.body.institution,
      category: req.body.category,
      hours: req.body.hours,
    });
    if (req.file) {
      requirement.file = req.file.path;
    }
    const postData = await requirement.save();
    res.status(201).json({
      success: true,
      message: "Data posted successfully",
      data: postData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

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

exports.deleteRequirement = async (req, res) => {
  try {
    const id = req.params.id
    const deletedData = await Requirement.findOneAndDelete({ _id: id });

    if (!deletedData) {
      return res.status(404).json({
        success: false,
        message: "Requirement not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Requirement deleted successfully",
      
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Download Requirement File
exports.downloadRequirementFile = async (req, res) => {
  try {
    const requirement = await Requirement.findById(req.params.id);
    if (!requirement) {
      return res.status(404).json({
        success: false,
        message: "Requirement not found",
      });
    }

    const filePath = requirement.file;
    if (!filePath) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    const fileName = path.basename(filePath);
    res.download(filePath, fileName);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

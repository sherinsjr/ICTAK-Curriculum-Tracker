const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload.js');
const {
  createRequirement,
  getAllRequirements,
  getRequirementDetails,
  deleteRequirement
} = require('../controllers/requirementFormContoller.js');




// Create Requirement --Admin
router.post('/create', upload.single('file'), createRequirement);



// Get All Requirements (Accessible by both admin and normal user)
router.route('/requirement').get(getAllRequirements);

// Get Requirement Details (Accessible by both admin and normal user)
router.route('/details/:id').get( getRequirementDetails);

// Delete Requirement --Admin
router.route('/delete/:id').post( deleteRequirement);

module.exports = router;

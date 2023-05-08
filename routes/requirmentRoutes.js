const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload.js');
const {
  createRequirement,
  getAllRequirements,
  getRequirementDetails,
  deleteRequirement,
  downloadRequirementFile
} = require('../controllers/requirementFormContoller.js');

// Create Requirement --Admin
router.post('/create', upload.single('file'), createRequirement);

// Get All Requirements (Accessible by both admin and normal user)
router.route('/requirement').get(getAllRequirements);

// Get Requirement Details (Accessible by both admin and normal user)
router.route('/detail/:id').get(getRequirementDetails);

// Download Requirement File
router.route('/download/:id').get(downloadRequirementFile);

// Delete Requirement --Admin
router.route('/:id').delete(deleteRequirement);

module.exports = router;

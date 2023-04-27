const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const { createRequirement, getAllRequirements } = require("../controllers/requirementFormContoller");

router.post("/create",upload.single('file'),createRequirement)
router.route("/requirements").get(getAllRequirements)



module.exports  = router
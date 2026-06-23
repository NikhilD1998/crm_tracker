const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const {
  createOpportunity,
  getAllOpportunities,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity,
} = require("../controllers/opportunityController");

// All opportunity routes require authentication
router.use(protect);

router.get("/", getAllOpportunities);

router.get("/:id", getOpportunityById);

router.post("/", createOpportunity);

router.put("/:id", updateOpportunity);

router.delete("/:id", deleteOpportunity);

module.exports = router;

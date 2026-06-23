const Opportunity = require("../models/opportunity");

const createOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.create({
      ...req.body,
      owner: req.user.id,
    });

    res.status(201).json({
      message: "Opportunity created successfully",
      opportunity,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getAllOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find()
      .populate("owner", "name email")
      .sort({
        createdAt: -1,
      });

    res.status(200).json(opportunities);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getOpportunityById = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id).populate(
      "owner",
      "name email",
    );

    if (!opportunity) {
      return res.status(404).json({
        message: "Opportunity not found",
      });
    }

    res.status(200).json(opportunity);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const updateOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({
        message: "Opportunity not found",
      });
    }

    if (opportunity.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can only update your own opportunities",
      });
    }

    const updatedOpportunity = await Opportunity.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      message: "Opportunity updated successfully",
      opportunity: updatedOpportunity,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({
        message: "Opportunity not found",
      });
    }

    if (opportunity.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can only delete your own opportunities",
      });
    }

    await opportunity.deleteOne();

    res.status(200).json({
      message: "Opportunity deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createOpportunity,
  getAllOpportunities,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity,
};

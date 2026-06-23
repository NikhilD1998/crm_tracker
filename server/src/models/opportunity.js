const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    customerName: {
      type: String,
      required: true,
    },

    contactName: String,

    contactEmail: String,

    contactPhone: String,

    requirement: {
      type: String,
      required: true,
    },

    estimatedValue: {
      type: Number,
      min: 0,
      default: 0,
    },

    stage: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost"],
      default: "New",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    nextFollowUpDate: Date,

    notes: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Opportunity", opportunitySchema);

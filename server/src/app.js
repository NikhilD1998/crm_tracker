const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const opportunityRoutes = require("./routes/opportunityRoutes");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "CRM Pipeline API Running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/opportunities", opportunityRoutes);

module.exports = app;

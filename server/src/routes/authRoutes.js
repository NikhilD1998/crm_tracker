const express = require("express");

const router = express.Router();

const { register, login, getMe } = require("../controllers/authController");

const protect = require("../middlewares/authMiddleware");

const {
  registerValidation,
  loginValidation,
} = require("../validators/authVaidator");

const validateRequest = require("../middlewares/validateRequest");

router.post("/register", registerValidation, validateRequest, register);

router.post("/login", loginValidation, validateRequest, login);

router.get("/me", protect, getMe);

module.exports = router;

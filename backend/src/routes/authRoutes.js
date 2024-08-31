const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const {
  registerUser,
  loginUser,
  fetchUser
} = require("../controllers/authController");

const verifyToken = require("../middlewares/verifyToken");

const validateUserInput = [
  body("email")
    .isEmail().withMessage("Invalid email address")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 5 }).withMessage("Password must be at least 8 characters long")
    .matches(/\d/).withMessage("Password must contain a number")
    .matches(/[A-Z]/).withMessage("Password must contain an uppercase letter")
    .matches(/[a-z]/).withMessage("Password must contain a lowercase letter")
    .matches(/[@$!%*?&#]/).withMessage("Password must contain a special character"),
  body("username")
    .isAlphanumeric().withMessage("Username must be alphanumeric")
    .isLength({ min: 3, max: 20 }).withMessage("Username must be between 3 to 20 characters")
    .trim().escape(), // ! will avoid any special characters preventing html injections
];

// Input validation for user ID
const validateUserId = [
  param("id")
    .isMongoId().withMessage("Invalid user ID") 
];


router.post("/register",  registerUser);

router.get("/:id", validateUserId ,fetchUser);

router.post("/login", loginUser);

router.get("/validate-token", verifyToken, (req, res) => {
  res.status(200).json({ valid: true });
});

module.exports = router;

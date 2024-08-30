const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  registerUser,
  loginUser,
  logoutUser,
  fetchUser
} = require("../controllers/authController");

const verifyToken = require("../middlewares/verifyToken");

const validateLoginInput = [
  body("email", "Invalid email address").isEmail(),
  body("password", "Password must be at least 5 characters long").isLength({
    min: 5,
  }),
];


router.post("/register", validateLoginInput, registerUser);

router.get("/:id", fetchUser);

router.post("/login", validateLoginInput, loginUser);

// router.post("/logout", logoutUser);

// router.get("/validate-token", verifyToken, (req, res) => {
//   res.status(200).json({ valid: true });
// });

module.exports = router;

const express = require("express");
const router = express.Router();
const sendEmail = require("../utils/emailService"); // Corrected import

router.post("/", async (req, res) => {
  const { email, purpose, data } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const otp = await sendEmail(email, purpose, data); 
    res.status(200).json({ message: "OTP sent successfully", otp }); 
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP", error: error.message });
  }
});

module.exports = router;

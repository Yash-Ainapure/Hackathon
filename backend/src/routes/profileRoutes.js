const express = require("express");
const { upload } = require("./cloudinary"); // Import Cloudinary config
const router = express.Router();

router.post(
  "/upload-profile-picture",
  upload.single("profilePicture"),
  (req, res) => {
    try {
      const profilePictureUrl = req.file.path;

      res.status(200).json({
        message: "Profile picture uploaded successfully!",
        profilePictureUrl,
      });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "An error occurred while uploading the picture.",
          error,
        });
    }
  }
);

module.exports = router;

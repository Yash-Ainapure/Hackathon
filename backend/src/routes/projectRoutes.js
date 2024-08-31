const express = require("express");
const router = express.Router();
const sendMail = require('../utils/pushNotification')
const {
  createProject,
  addMemberInProject,
  getProjectByUserId,
  fetchProjects
} = require("../controllers/projectController");

// Middleware for token verification (not used here, but keep if needed)
const verifyToken = require("../middlewares/verifyToken");

router.post("/createproject", createProject);

// Corrected to use GET instead of POST for fetching projects
router.get("/fetchProjects/:id", fetchProjects);

router.get('/:id', getProjectByUserId);

router.post("/add-member", async (req, res) => {
  const { userId, projectId } = req.body;

  try {
    await addMemberInProject(userId, projectId);
    await sendMail(userId)
    res.status(200).json({ message: "Member added to project successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding member to project" });
  }
});

module.exports = router;
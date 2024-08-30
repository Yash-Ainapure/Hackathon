const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  createProject,
  addMemberInProject,
  getProjectByUserId,
  fetchProjects
} = require("../controllers/projectController");

const verifyToken = require("../middlewares/verifyToken");

router.post("/createproject", createProject);

router.post("/fetchProjects/:id", fetchProjects);

router.get('/:id', getProjectByUserId);

router.post("/add-member", async (req, res) => {
  const { userId, projectId } = req.body;

  try {
    await addMemberInProject(userId, projectId);
    res.status(200).json({ message: "Member added to project successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding member to project" });
  }
});

module.exports = router;

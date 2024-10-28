const express = require("express");
const router = express.Router();
const sendMail = require('../utils/pushNotification')
const {
  createProject,
  addMemberInProject,
  getProjectByUserId,
  addMembersToProject,
  removeMemberFromProject,
  fetchProjectMembers,
  fetchProjects,
  deleteProject
} = require("../controllers/projectController");

// Middleware for token verification (not used here, but keep if needed)
const verifyToken = require("../middlewares/verifyToken");

router.post("/createproject", createProject);

router.post("/fetchProjectMembers", fetchProjectMembers);

// ? Corrected to use GET instead of POST for fetching projects
router.get("/fetchProjects/:id", fetchProjects);

router.get('/:id', getProjectByUserId);

// TODO: To be removed
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

// api to remove a member from a project
router.delete("/remove-member", removeMemberFromProject);

// ? API to add members to a project using a json object containing list of member emails and their role
router.post("/add-members", addMembersToProject);

router.delete('/delete-project', deleteProject)

module.exports = router;
 
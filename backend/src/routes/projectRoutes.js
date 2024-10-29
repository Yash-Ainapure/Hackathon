const express = require("express");
const router = express.Router();
const sendMail = require('../utils/pushNotification')
const {
  createProject,
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

// api to remove a member from a project
router.delete("/remove-member", removeMemberFromProject);

// ? API to add members to a project using a json object containing list of member emails and their role
router.post("/add-members", addMembersToProject);

router.delete('/delete-project', deleteProject)

module.exports = router;
 
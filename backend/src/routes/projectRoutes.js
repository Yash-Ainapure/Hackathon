const express = require("express");
const router = express.Router();
const sendMail = require("../utils/pushNotification");
const {
  createProject,
  getProjectByUserId,
  addMembersToProject,
  removeMemberFromProject,
  fetchProjectMembers,
  fetchProjects,
  fetchProjectMembers2,
  updateGithubInfo,
  deleteProject,
  updateProject,
  removeMemberFromProjectV2,
} = require("../controllers/projectController");

// Middleware for token verification (not used here, but keep if needed)
const verifyToken = require("../middlewares/verifyToken");

router.post("/createproject", createProject); // ? .. Used

router.post("/fetchProjectMembers", fetchProjectMembers); // ? .. Used
router.get("/:id/members", fetchProjectMembers2); // ? .. Used

// ? Corrected to use GET instead of POST for fetching projects
router.get("/fetchProjects/:id", fetchProjects); // ? .. Used

router.get("/:id", getProjectByUserId); // ? .. Used

// api to remove a member from a project
router.delete("/remove-member", removeMemberFromProject); // ? .. Used

// ? API to add members to a project using a json object containing list of member emails and their role
router.post("/add-members", addMembersToProject); // ? .. Used
router.post("/github-update", updateGithubInfo); // ? .. Used
router.delete("/delete-project", deleteProject); // ? .. Used
router.put("/update-project/:id", updateProject); // ! .. Unused
router.post("/remove-member-v2", removeMemberFromProjectV2); // ? .. Used

module.exports = router;

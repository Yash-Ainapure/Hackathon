const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const Project = require("../models/Project");
const router = require("../routes/projectRoutes");

// ? Create a new project
const createProject = async (req, res) => {
  const { name, owner, projectDescription, projectMembers, projectAdmins } =
    req.body;

  // Check if a project with that name already exists
  const projectExists = await Project.findOne({ name });
  if (projectExists) {
    return res.status(400).json({ message: "Project already exists" });
  }

  try {
    // Replace usernames of each admin with their _id
    if (projectAdmins.length > 0) {
      for (let i = 0; i < projectAdmins.length; i++) {
        const adminUsername = projectAdmins[i];
        const admin = await User.findOne({ username: adminUsername }, "_id");

        if (admin) {
          projectAdmins[i] = admin._id;
          await addMemberInProject(admin._id, project._id);
        } else {
          return res
            .status(400)
            .json({ message: `Invalid admin username: ${adminUsername}` });
        }
      }
    }

    // Replace usernames of each member with their _id
    if (projectMembers.length > 0) {
      for (let i = 0; i < projectMembers.length; i++) {
        const memberUsername = projectMembers[i];
        const member = await User.findOne({ username: memberUsername }, "_id");

        if (member) {
          projectMembers[i] = member._id;
          await addMemberInProject(admin._id, project._id);
        } else {
          console.log(`User not found for username: ${memberUsername}`);
        }
      }
    }

    // Create a new project object to be added to the database
    const newProject = new Project({
      name: name,
      owner: owner,
      projectDescription: projectDescription,
      projectAdmins: projectAdmins,
      projectMembers: projectMembers,
    });
    await newProject.save();
    res.status(201).json({ message: "Project registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating the project" });
  }
};

const fetchProjects = async (req, res) => {
  try {
    const projectId = req.params.id;

    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getProjectByUserId = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.projects);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const addMemberInProject = async (userId, projectId) => {
    try {
      await User.findByIdAndUpdate(userId, { $addToSet: { projects: projectId } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating members with projects" });
    }
  };
  
  module.exports = {
    createProject,
    addMemberInProject,
    getProjectByUserId,
    fetchProjects
  };
  

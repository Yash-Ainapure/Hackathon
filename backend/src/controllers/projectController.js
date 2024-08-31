const User = require("../models/User"); // Ensure User model is imported
const Project = require("../models/Project");

// Create a new project
const createProject = async (req, res) => {
  const {
    name,
    owner,
    ownerName,
    projectDescription,
    projectMembers,
    projectAdmins,
    startDate,
    endDate,
  } = req.body;

  // Check if a project with that name already exists
  const projectExists = await Project.findOne({ name });
  if (projectExists) {
    return res.status(400).json({ message: "Project already exists" });
  }

  try {
    // Replace usernames of each admin with their _id
    for (let i = 0; i < projectAdmins.length; i++) {
      const adminUsername = projectAdmins[i];
      const admin = await User.findOne({ username: adminUsername }, "_id");
      if (admin) {
        projectAdmins[i] = admin._id;
      } else {
        return res
          .status(400)
          .json({ message: `Invalid admin username: ${adminUsername}` });
      }
    }

    // Replace usernames of each member with their _id
    for (let i = 0; i < projectMembers.length; i++) {
      const memberUsername = projectMembers[i];
      const member = await User.findOne({ username: memberUsername }, "_id");
      if (member) {
        projectMembers[i] = member._id;
      } else {
        console.log(`User not found for username: ${memberUsername}`);
      }
    }

    // Create a new project object to be added to the database
    const newProject = new Project({
      name,
      owner,
      ownerName,
      projectDescription,
      projectAdmins,
      projectMembers,
      startDate,
      endDate,
    });

    await newProject.save();
    res.status(201).json({ message: "Project registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating the project" });
  }
};

// Fetch a project by ID
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

// Get projects by user ID
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

// Add a member to a project
const addMemberInProject = async (userId, projectId) => {
  try {
    await User.findByIdAndUpdate(userId, {
      $addToSet: { projects: projectId },
    });
  } catch (error) {
    console.error("Error adding member to project:", error);
  }
};

module.exports = {
  createProject,
  addMemberInProject,
  getProjectByUserId,
  fetchProjects,
};

const User = require("../models/User"); // Ensure User model is imported
const Project = require("../models/Project");

// Create a new project
const createProject = async (req, res) => {
  console.log(req);
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
    console.log(projectAdmins);

    if (projectAdmins) {
      console.log("inside if admin");

      for (let i = 0; i < projectAdmins.length; i++) {
        const adminUsername = projectAdmins[i];
        const admin = await User.findOne({ username: adminUsername }, "_id");
        console.log("zzzzzzzzzzzzzzzzzzzz");
        console.log(admin);

        if (admin) {
          projectAdmins[i] = admin._id;
          console.log("sdfbhdbbdzbgfjdjgjdfugwefhhrbbsivdfjb");
        } else {
          return res
            .status(400)
            .json({ message: `Invalid admin username: ${adminUsername}` });
        }
      }
    }
    // Replace usernames of each member with their _id
    console.log(projectMembers);

    if (projectMembers) {
      for (let i = 0; i < projectMembers.length; i++) {
        console.log("inside if members");
        const memberUsername = projectMembers[i];
        const member = await User.findOne({ username: memberUsername }, "_id");
        if (member) {
          projectMembers[i] = member._id;
        } else {
          console.log(`User not found for username: ${memberUsername}`);
        }
      }
    }

    // Create a new project object to be added to the database
    const newProject = new Project({
      name: name || "Untitled Project",
      owner: owner || "Unknown Owner",
      ownerName: ownerName || "No Owner Name",
      projectDescription: projectDescription || "No description provided",
      projectAdmins: projectAdmins || [],
      projectMembers: projectMembers || [],
      startDate: startDate || new Date(), // Default to the current date
      endDate: endDate || null, // or a specific date
    });

    await newProject.save();

    // Add the project ID to the current user's projects array
    const updatedUser = await User.findByIdAndUpdate(
      owner,
      { $push: { projects: newProject._id } }, // Push the new project's ID to the user's projects array
      { new: true } // Return the updated user document
    );
    console.log("Project addedto User:"+updatedUser);

    if (!updatedUser) {
      return res
        .status(400)
        .json({ message: "User not found or failed to update" });
    }

    res.status(201).json({ message: "Project registered successfully" });
  } catch (error) {
    console.error("Error during project creation:", error);
    res.status(500).json({ message: "Internal server error", error });
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
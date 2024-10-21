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

  // ! Check if a project with that name already exists
  const projectExists = await Project.findOne({ name });
  if (projectExists) {
    return res.status(400).json({ message: "Project already exists" });
  }

  try {
    // ! Replace usernames of each admin with their _id
    if (projectAdmins) {
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
    }

    // ! Replace usernames of each member with their _id

    if (projectMembers) {
      for (let i = 0; i < projectMembers.length; i++) {
        const memberUsername = projectMembers[i];
        const member = await User.findOne({ username: memberUsername }, "_id");
        if (member) {
          projectMembers[i] = member._id;
        } else {
          console.log(`User not found for username: ${memberUsername}`);
        }
      }
    }

    // ! Create a new project object to be added to the database
    const newProject = new Project({
      name: name || "Untitled Project",
      owner: owner || "Unknown Owner",
      ownerName: ownerName || "No Owner Name",
      projectDescription: projectDescription || "No description provided",
      projectAdmins: projectAdmins || [],
      projectMembers: projectMembers || [],
      startDate: startDate || new Date(), // ? Default to the current date
      endDate: endDate || null, // ? or a specific date
    });

    await newProject.save();

    // ! Add the project ID to the current user's projects array because he is the owner
    const updatedUser = await User.findByIdAndUpdate(
      owner,
      { $push: { projects: newProject._id } }, // ! Push the new project's ID to the user's projects array
      { new: true } // ! Return the updated user document
    );

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
// TODO: Take User's email instead of ID
const addMemberInProject = async (userId, projectId) => {
  try {
    await User.findByIdAndUpdate(userId, {
      $addToSet: { projects: projectId },
    });
  } catch (error) {
    console.error("Error adding member to project:", error);
  }
};

// ! Api to add a member to a project using a json object containing list of member emails and their role
// ! The json object should be in the following format:
// ! {
// !   "projectId": "project_id",
// !   "members": {
// !       "email": ["member_email", "member_email", "member_email"],
// !       "role": "member_role"
// !     }
// ! }
// ! The role can be either "admin" or "member"

const addMembersToProject = async (req, res) => {
  try {
    const { projectId, members } = req.body;
    if (!projectId || !members) {
      return res.status(400).json({ message: "Project ID and members are required" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const { email, role } = members;
    if (!email || !role) {
      return res.status(400).json({ message: "Email and role are required" });
    }

    for (let i = 0; i < email.length; i++) {
      const member = await User.findOne({ email: email[i] });
      if (!member) {
        return res.status(404).json({ message: `User not found for email: ${email[i]}` });
      }

      if (role === "admin") {
        project.projectAdmins.push(member._id);
      } else if (role === "member") {
        project.projectMembers.push(member._id);
      } else {
        return res.status(400).json({ message: "Invalid role" });
      }
      await project.save();
    }

    res.status(200).json({ message: "Members added successfully" });
  } catch (error) {
    console.error("Error adding members to project:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// ? Remove a member from a project.. Removes the user id from the project's projectMembers and projectAdmins arrays if it exists
const removeMemberFromProject = async (req, res) => {
  try {
    const { userId, projectId } = req.body;
    if (!userId || !projectId) {
      return res.status(400).json({ message: "User ID and Project ID are required" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const member = await User.findById(userId);
    if (!member) {
      return res.status(404).json({ message: "User not found" });
    }

    project.projectMembers.pull(member._id);
    project.projectAdmins.pull(member._id);
    await project.save();

    res.status(200).json({ message: "Member removed successfully" });
  } catch (error) {
    console.error("Error removing member from project:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// ? Delete a project
// ? Deletes the project id from all the member's collection who are part of the project then deletes the project
const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    const project = await Project.findById(projectId);
    const projectMembers = project.projectMembers;
    const projectAdmins = project.projectAdmins;
    for (const admin in projectAdmins) {
      await User.findByIdAndUpdate(admin, { $pull: { projects: projectId } });
    }
    for (const member in projectMembers) {
      await User.findByIdAndUpdate(member, { $pull: { projects: projectId } });
    }

    await Project.findByIdAndDelete(projectId);
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Server error" });
  }
}
    

module.exports = {
  createProject,
  addMemberInProject,
  getProjectByUserId,
  addMembersToProject,
  removeMemberFromProject,
  fetchProjects,
  deleteProject
};
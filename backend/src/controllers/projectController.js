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
      // projectAdmins: projectAdmins || [],
      projectAdmins: projectAdmins || [owner],
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

// const fetchProjectMembers = async (req, res) => {
//   try {
//     const { projectId } = req.body; // Extract projectId from the request body
//     if (!projectId) {
//       return res.status(400).json({ message: "Project ID is required" });
//     }

//     const project = await Project.findById(projectId); // Use the extracted projectId
//     if (!project) {
//       return res.status(404).json({ message: "Project not found" });
//     }

//     const projectMembers = project.projectMembers;
//     const projectAdmins = project.projectAdmins;
//     const members = [];

//     for (const adminId of projectAdmins) {
//       const adminDetails = await User.findById(adminId);
//       if (adminDetails) {
//         members.push({
//           name: adminDetails.name,
//           email: adminDetails.email,
//           role: "Admin",
//         });
//       }
//     }

//     for (const memberId of projectMembers) {
//       const memberDetails = await User.findById(memberId);
//       if (memberDetails) {
//         members.push({
//           name: memberDetails.name,
//           email: memberDetails.email,
//           role: "Member",
//         });
//       }
//     }

//     res.status(200).json({ members });
//   } catch (error) {
//     console.error("Error fetching project members:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// ***** above previous

const fetchProjectMembers = async (req, res) => {
  try {
    const { id } = req.params;  // Extract projectId from the route parameters (GET method)

    if (!id) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    const project = await Project.findById(id).populate('projectMembers').populate('projectAdmins'); // Use populate to get the members and admins in a single query
    console.log("PrOjEcT :- ",project);
    
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const members = [];
    
    // Populate project admins
    for (const admin of project.projectAdmins) {
      members.push({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: "Admin",
      });
    }

    // Populate project members
    for (const member of project.projectMembers) {
      members.push({
        _id: member._id,
        name: member.name,
        email: member.email,
        role: "Member",
      });
    }

    res.status(200).json({ members });
  } catch (error) {
    console.error("Error fetching project members:", error);
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
    console.log("Received Data:", projectId, members);

    if (!projectId || !members || !members.email || !members.role) {
      return res.status(400).json({ message: "Project ID, email, and role are required" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const { email, role } = members;
    const failedEmails = [];

    // Process each email
    for (let i = 0; i < email.length; i++) {
      const member = await User.findOne({ email: email[i] });
      if (!member) {
        // Collect failed emails to send back as feedback, skip to next
        failedEmails.push(email[i]);
        continue;
      }

      if (role === "admin") {
        if (!project.projectAdmins.includes(member._id)) {
          // Remove from members if already in projectMembers
          project.projectMembers.pull(member._id);
          project.projectAdmins.push(member._id);
        }
      } else if (role === "member") {
        if (!project.projectMembers.includes(member._id)) {
          // Remove from admins if already in projectAdmins
          project.projectAdmins.pull(member._id);
          project.projectMembers.push(member._id);
        }
      } else {
        return res.status(400).json({ message: "Invalid role" });
      }

      // Add project to member's projects if not already included
      if (!member.projects.includes(project._id)) {
        member.projects.push(project._id);
      }
      
      await member.save();
    }

    // Save the project after all members are processed
    await project.save();

    // Return success response with feedback on failed emails, if any
    if (failedEmails.length > 0) {
      return res.status(207).json({
        message: "Members added successfully with some errors",
        failedEmails,
      });
    }
    res.status(200).json({ message: "Members added successfully" });
  } catch (error) {
    console.error("Error adding members to project:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ? Remove a member from a project.. Removes the user id from the project's projectMembers and projectAdmins arrays if it exists
const removeMemberFromProject = async (req, res) => {
  try {
    const { userId, projectId } = req.body;
    if (!userId || !projectId) {
      return res
        .status(400)
        .json({ message: "User ID and Project ID are required" });
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
};

// ? Delete a project
// ? Deletes the project id from all the member's collection who are part of the project then deletes the project
const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.body;
    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const { projectMembers, projectAdmins } = project;

    // Update each admin by removing the project ID
    for (const admin of projectAdmins) {
      await User.findByIdAndUpdate(admin, { $pull: { projects: projectId } });
    }

    // Update each member by removing the project ID
    for (const member of projectMembers) {
      await User.findByIdAndUpdate(member, { $pull: { projects: projectId } });
    }

    // Finally, delete the project itself
    await Project.findByIdAndDelete(projectId);

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createProject,
  getProjectByUserId,
  addMembersToProject,
  removeMemberFromProject,
  fetchProjectMembers,
  fetchProjects,
  deleteProject,
};

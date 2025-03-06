const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const Project = require("../models/Project");

// ? Register a new user
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  //! Check if there are validation errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), success: false });
  }

  const { name, email, password, jobInfo = "", profilePic = "" } = req.body;

  try {
    //! Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    //! Create a new user object with optional jobInfo and profilePic
    const newUser = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      jobInfo: jobInfo || "",
      profilePic: profilePic || "",
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ? Fetch user details based on token
const fetchUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { _id, name, email, jobInfo, profilePic, firstName, lastName } = req.body.user;
    console.log(req.body);
    const fullName = firstName + " " + lastName;

    if (!_id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields if provided
    user.name = fullName.trim() ? fullName : name || user.name;
    user.email = email || user.email;

    // Update jobInfo if provided
    if (jobInfo && typeof jobInfo === "object" && jobInfo.title) {
      user.jobInfo = jobInfo.title;
    } else if (typeof jobInfo === "string") {
      user.jobInfo = jobInfo;
    }

    // Update the profilePic if provided
    if (profilePic) {
      user.profilePic = profilePic;
    }

    // Save the updated user
    await user.save();

    // **Update Projects Collection**
    await Project.updateMany(
      { owner: _id },  // Find projects where the user is the owner
      { $set: { ownerName: user.name } } // Update ownerName field
    );

    await Project.updateMany(
      { projectAdmins: _id }, // Find projects where user is an admin
      { $set: { "projectAdmins.$": _id } } // Update projectAdmins array
    );

    await Project.updateMany(
      { projectMembers: _id }, // Find projects where user is a member
      { $set: { "projectMembers.$": _id } } // Update projectMembers array
    );

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ? Login user
const loginUser = async (req, res) => {
  
  const errors = validationResult(req);
  let success = false;

  // Check if there are validation errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), success });
  }

  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success });
    }

    // Generate a token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    success = true;
    return res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error during user login:", error); // Log the error for debugging purposes
    return res.status(500).json({ message: "Server error", success });
  }
};

// ? Logout user
const logoutUser = (req, res) => {
  res.status(200).json({ message: "User logged out successfully" });
};

module.exports = {
  registerUser,
  fetchUser,
  updateUser,
  loginUser,
  logoutUser,
};
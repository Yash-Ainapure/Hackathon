const mongoose = require("mongoose");
const { Schema } = mongoose;

const JobInfoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});


const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  projects: {
    type: Array,
    default: [],
  },
  profilePic: {
    type: String,
  },
  jobInfo: {
    type: JobInfoSchema,
    default: {}, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

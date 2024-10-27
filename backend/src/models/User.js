const mongoose = require("mongoose");
const { Schema } = mongoose;

const JobInfoSchema = new Schema({
  title: {
    type: String,
  },
  department: {
    type: String,
  },
  organization: {
    type: String,
  },
  location: {
    type: String,
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
    default: 'https://via.placeholder.com/200'
  },
  jobInfo: {
    type: String,
    default: "", 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

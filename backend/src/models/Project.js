const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProjectSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
    default: 0,
  },
  projectAdmins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  projectMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  toDO: {
    type: Array,
    default: [],
  },
  inProgress: {
    type: Array,
    default: [],
  },
  completed: {
    type: Array,
    default: [],
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  gitUsername: {
    type: String,
    default: "",
  },
  gitRepo: {
    type: String,
    default: "",
  },
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;

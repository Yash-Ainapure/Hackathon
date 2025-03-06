const mongoose = require("mongoose");
const { Schema } = mongoose;
const { encrypt, decrypt } = require("../utils/encryptionService");

const encryptArray = (tasks) => {
  if (!Array.isArray(tasks)) return [];
  return tasks.map((task) => ({
    ...task,
    taskName: task.taskName ? encrypt(task.taskName) : "",
    taskDescription: task.taskDescription ? encrypt(task.taskDescription) : "",
    assignedTo: task.assignedTo ? encrypt(task.assignedTo) : "",
    reporter: task.reporter ? encrypt(task.reporter) : "",
  }));
};

const decryptArray = (tasks) => {
  if (!Array.isArray(tasks)) return [];
  return tasks.map((task) => ({
    ...task,
    taskName: task.taskName ? decrypt(task.taskName) : "",
    taskDescription: task.taskDescription ? decrypt(task.taskDescription) : "",
    assignedTo: task.assignedTo ? decrypt(task.assignedTo) : "",
    reporter: task.reporter ? decrypt(task.reporter) : "",
  }));
};


const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      set: encrypt,
      get: decrypt,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
      set: encrypt,
      get: decrypt,
    },
    projectDescription: {
      type: String,
      required: true,
      set: encrypt,
      get: decrypt,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
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
      type: [
        {
          taskid: String,
          taskName: String,
          taskDescription: String,
          assignedTo: String,
          reporter: String,
          startDate: Date,
          dueDate: Date,
        },
      ],
      default: [],
      set: encryptArray,
      get: decryptArray,
    },
    inProgress: {
      type: [
        {
          taskid: String,
          taskName: String,
          taskDescription: String,
          assignedTo: String,
          reporter: String,
          startDate: Date,
          dueDate: Date,
        },
      ],
      default: [],
      set: encryptArray,
      get: decryptArray,
    },
    completed: {
      type: [
        {
          taskid: String,
          taskName: String,
          taskDescription: String,
          assignedTo: String,
          reporter: String,
          startDate: Date,
          dueDate: Date,
        },
      ],
      default: [],
      set: encryptArray,
      get: decryptArray,
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
      immutable: true,
    },
    gitUsername: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },
    gitRepo: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { toJSON: { getters: true }, toObject: { getters: true } }
);

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
  taskName: {
    type: String,
    required: true,
  },
  taskDescription: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["ToDo", "InProgress", "Finished"],
    default: 'ToDo',
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;

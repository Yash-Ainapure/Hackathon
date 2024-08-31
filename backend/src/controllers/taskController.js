const Task = require("../models/Task");

// Utility function to format date as YYYY-MM-DD
const formatDate = (date) => {
  if (!date) return undefined;
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Create a new task
const createTask = async (req, res) => {
  const {
    taskName,
    taskDescription,
    status,
    projectId,
    assignedTo,
    startDate,
    endDate,
  } = req.body;

  const validStatuses = ["ToDo", "InProgress", "Finished"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      message: "Invalid status. Valid statuses are 'ToDo', 'InProgress', and 'Finished'.",
    });
  }

  try {
    const newTask = new Task({
      taskName,
      taskDescription,
      status,
      projectId,
      assignedTo,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });

    await newTask.save();
    res.status(201).json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update an existing task
const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { taskName, taskDescription, status, assignedTo, startDate, endDate } = req.body;

  const allowedStatuses = ["ToDo", "InProgress", "Finished"];

  if (status && !allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (taskName) task.taskName = taskName;
    if (taskDescription) task.taskDescription = taskDescription;
    if (status) task.status = status;
    if (assignedTo) task.assignedTo = assignedTo;
    if (startDate) task.startDate = formatDate(startDate);
    if (endDate) task.endDate = formatDate(endDate);

    await task.save();
    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTask = async (req, res) => {
    const { taskId } = req.params; 
  
    try {
      const result = await Task.findByIdAndDelete(taskId);
  
      if (!result) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

module.exports = {
  createTask,
  updateTask,
  deleteTask
};

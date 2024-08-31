const Task = require("../models/Task");
const Project = require("../models/Project"); // Ensure Project model is imported

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
    projectId,
    assignedTo,
    startDate,
    endDate,
  } = req.body;

  try {
    const newTask = new Task({
      taskName,
      taskDescription,
      projectId,
      assignedTo,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });

    // Save the task
    await newTask.save();

    // Add the task to the project's toDo array
    await addTasksToProject(projectId, newTask._id);

    res.status(201).json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to add a task to the project's toDo array
const addTasksToProject = async (projectId, taskId) => {
  try {
    await Project.findByIdAndUpdate(
      projectId,
      { $addToSet: { toDO: taskId } }, // Ensure no duplicates by using $addToSet
      { new: true } // Return the updated document
    );
  } catch (error) {
    console.error("Error adding task to project:", error);
  }
};

// Update an existing task
const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { taskName, taskDescription, status, assignedTo, startDate, endDate } = req.body;

  const allowedStatuses = ["ToDo", "InProgress", "Completed"];

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

// Get all tasks for a given project ID, grouped by status
const getAllTasks = async (req, res) => {
  const { id: projectId } = req.params;

  if (!projectId) {
    return res.status(400).json({ message: "Project ID is required" });
  }

  try {
    // Find the project by ID
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Extract task IDs from the project's arrays
    const toDOIds = project.toDO;
    const inProgressIds = project.inProgress;
    const completedIds = project.completed;

    console.log("Project found with task IDs:", {
      toDOIds,
      inProgressIds,
      completedIds
    });

    const taskQueries = [];

    if (toDOIds.length > 0) {
      console.log(`Finding tasks with IDs: ${toDOIds}`);
      taskQueries.push(await Task.find({ _id: { $in: toDOIds } }).exec());
      console.log(taskQueries);
      
    } else {
      taskQueries.push(Promise.resolve([]));
    }

    if (inProgressIds.length > 0) {
      console.log(`Finding tasks with IDs: ${inProgressIds}`);
      taskQueries.push(Task.find({ _id: { $in: inProgressIds } }).json());
    } else {
      taskQueries.push(Promise.resolve([]));
    }

    if (completedIds.length > 0) {
      console.log(`Finding tasks with IDs: ${completedIds}`);
      taskQueries.push(Task.find({ _id: { $in: completedIds } }).exec());
    } else {
      taskQueries.push(Promise.resolve([]));
    }

    // Execute all queries in parallel
    const [toDOTasks, inProgressTasks, completedTasks] = await Promise.all(taskQueries);

    console.log("Tasks retrieved:", {
      toDOTasks,
      inProgressTasks,
      completedTasks
    });

    // Return the tasks grouped by status
    res.status(200).json({
      toDO: toDOTasks,
      inProgress: inProgressTasks,
      completed: completedTasks
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Delete a task
const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    // Find the task and remove it
    const result = await Task.findByIdAndDelete(taskId);

    if (!result) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Remove the task from the project's toDo list
    await Project.updateMany(
      { toDO: taskId },
      { $pull: { toDO: taskId } }
    );

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks
};

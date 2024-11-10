const Task = require("../models/Task");
const Project = require("../models/Project"); // Ensure Project model is imported

// Utility function to format date as YYYY-MM-DD
const formatDate = (date) => {
  if (!date) return undefined;
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
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
    // ! Task's name should be added to the project's toDo array instead of task's id
    await addTasksToProject(projectId, newTask._id);

    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ? Function to add a task to the project's toDo array
// TODO: Task's name should be added to the project's toDo array instead of task's id
const addTasksToProject = async (projectId, taskId) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $addToSet: { toDO: taskId } }, // Use $addToSet to prevent duplicates
      { new: true } // Return the updated document
    );

    if (!updatedProject) {
      // Handle the case where the project is not found
      console.error(`Project with id ${projectId} not found.`);
      return { success: false, message: "Project not found." };
    }

    console.log(`Task ${taskId} added to project ${projectId} successfully.`);
    return { success: true, project: updatedProject }; // Return success and the updated project
  } catch (error) {
    console.error("Error adding task to project:", error);
    return { success: false, message: "Error adding task to project", error }; // Return error information
  }
};

// Update an existing task
const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { taskName, taskDescription, status, assignedTo, startDate, endDate } =
    req.body;

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
  try {
    // Find the project by ID
    const project = await Project.find();

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
      completedIds,
    });

    const taskQueries = [];

    if (toDOIds && toDOIds.length > 0) {
      console.log(`Finding tasks with IDs: ${toDOIds}`);
      taskQueries.push(await Task.find({ _id: { $in: toDOIds } }).exec());
      console.log(taskQueries);
    } else {
      taskQueries.push(Promise.resolve([]));
    }

    if (inProgressIds && inProgressIds.length > 0) {
      console.log(`Finding tasks with IDs: ${inProgressIds}`);
      taskQueries.push(Task.find({ _id: { $in: inProgressIds } }).json());
    } else {
      taskQueries.push(Promise.resolve([]));
    }

    if (completedIds && completedIds.length > 0) {
      console.log(`Finding tasks with IDs: ${completedIds}`);
      taskQueries.push(Task.find({ _id: { $in: completedIds } }).exec());
    } else {
      taskQueries.push(Promise.resolve([]));
    }

    // Execute all queries in parallel
    const [toDOTasks, inProgressTasks, completedTasks] = await Promise.all(
      taskQueries
    );

    console.log("Tasks retrieved:", {
      toDOTasks,
      inProgressTasks,
      completedTasks,
    });

    // Return the tasks grouped by status
    res.status(200).json({
      toDO: toDOTasks,
      inProgress: inProgressTasks,
      completed: completedTasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// TODO: Whether the task name should be added or task ids is to be checked
const updateTaskStatus = async (req, res) => {
  const { projectId, toDO, inProgress, completed } = req.body;
  console.log("Recieved data:",toDO, inProgress, completed);
  // Simple validation for required fields
  if (!projectId || !Array.isArray(toDO) || !Array.isArray(inProgress) || !Array.isArray(completed)) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  try {
    // Find the project by ID
    const project = await Project.findById(projectId);
    // Check if the project was found
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Update the project's task lists
    project.toDO = toDO;
    project.inProgress = inProgress;
    project.completed = completed;

    // Save the updated project
    await project.save();

    // Respond with success
    res.status(200).json({ message: "Task status updated successfully" });
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ error: "Server error updating task status" });
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
    await Project.updateMany({ toDO: taskId }, { $pull: { toDO: taskId } });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  getAllTasks,
};

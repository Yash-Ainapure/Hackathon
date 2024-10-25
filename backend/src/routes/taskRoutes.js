const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  getAllTasks
} = require("../controllers/taskController");

router.post("/create", createTask);

router.put("/update/:taskId", updateTask);

router.post('/updateTaskStatus', updateTaskStatus);

router.delete("/deleteTask/:taskId", deleteTask);

router.get("/get-tasks/", getAllTasks);

module.exports = router;

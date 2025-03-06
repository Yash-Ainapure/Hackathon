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

router.post("/create", createTask); // ! .. Unused

router.put("/update/:taskId", updateTask); // ! .. Unused

router.post('/updateTaskStatus', updateTaskStatus);

router.delete("/deleteTask/:taskId", deleteTask);

router.get("/get-tasks/", getAllTasks); // ! .. Unused

module.exports = router;

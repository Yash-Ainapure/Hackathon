const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  createTask,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

router.post("/create", createTask);

router.put("/update/:taskId", updateTask);

router.delete("/deleteTask/:taskId", deleteTask);

module.exports = router;

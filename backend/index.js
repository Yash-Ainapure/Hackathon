require('dotenv').config(); // Load environment variables
const express = require("express");
const cors = require('cors');
const connectToMongo = require("./src/config/db");

const app = express();
const port = process.env.PORT || 5000; // Set a default port if not defined in .env

// Connect to MongoDB
connectToMongo();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/projects", require("./src/routes/projectRoutes"));
app.use("/api/sendMail", require("./src/routes/mailRoutes"));
app.use("/api/tasks", require("./src/routes/taskRoutes"))

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

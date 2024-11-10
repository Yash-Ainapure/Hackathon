require('dotenv').config(); // Load environment variables
const express = require("express");
const cors = require('cors');
const { Server } = require('socket.io')
const { createServer } = require("http")
const connectToMongo = require("./src/config/db");
const port = process.env.PORT || 5000; // Set a default port if not defined in .env


const app = express();
app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', 'DELETE', 'PUT'], 
  credentials: true
}));
app.use(express.json());
const server = createServer(app)


const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ['GET', 'POST', 'DELETE', 'PUT'], 
    credentials: true
  }
})
// Connect to MongoDB
connectToMongo();

io.on('connection', (socket) => {
  console.log('user connected', socket.id)

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  //listner for message
  socket.on('message',(data)=>{
    console.log(data)
    socket.broadcast.emit("receive-message",data) 
  })

  // socket.emit("welcome","welcome to the server"+socket.id)
  // socket.broadcast.emit("welcome","welcome to server: "+socket.id)
});

app.get("/", (req, res) => {
  res.send("Welcome to the Task Manager API");
});

// Routes
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/projects", require("./src/routes/projectRoutes"));
app.use("/api/sendMail", require("./src/routes/mailRoutes"));
app.use("/api/tasks", require("./src/routes/taskRoutes"))
app.use("/api/chat", require("./src/routes/chatRoutes"));

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

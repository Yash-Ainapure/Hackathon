const express = require('express');
const router = require('./routes/exampleRoute');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());

// Register routes
app.use('/api', router);

// Error handling middleware
app.use(errorHandler);

module.exports = app;

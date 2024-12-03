const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/auth.js');
const taskRoutes = require('./routes/tasks.js');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);


// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, 'Frontend')));

// Fallback route for the frontend (catch-all route for SPA)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend', '404.html'));
});

// Fallback for undefined routes (404 handler)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'Frontend', '404.html'));
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
require('dotenv').config();
const express = require('express'); // Import Express.js
const connectDB = require('./config/database'); // Import the database connection function

const app = express(); // Initialize Express

const PORT = process.env.PORT || 3000; // Set the port, default to 3000

// Connect Database
connectDB(); // Connect to MongoDB using Mongoose

// Init Middleware
app.use(express.json()); // Initialize middleware to parse JSON bodies

// Serve Static Files
app.use(express.static('public'));

// Define Routes
app.use('/api/notes', require('./routes/noteRoutes')); // Note-related CRUD routes
app.use('/api/auth', require('./routes/authRoutes')); // User-related routes (e.g., authentication)

// Define the home route
app.get('/', (req, res) => {
  res.send('Welcome to the Note-Taking App!'); // Basic home route for initial testing
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log the port the server is running on
});


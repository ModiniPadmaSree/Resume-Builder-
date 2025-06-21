const express = require('express');
const cors = require('cors'); // Middleware for enabling Cross-Origin Resource Sharing
const mongoose = require('mongoose'); // Mongoose for MongoDB object modeling
const dotenv = require('dotenv'); // To load environment variables from .env file

// Load environment variables from .env file into process.env
dotenv.config();

// Import the resume routes
const resumeRoutes = require('./routes/resumeRoutes');

// Initialize the Express application
const app = express();

// Middleware Setup
app.use(cors()); // Enable CORS for all incoming requests
app.use(express.json()); // Enable Express to parse JSON formatted request bodies

// Define a simple root route to confirm the API is running
app.get('/', (req, res) => {
  res.send('Resume Builder API is running!');
});

// Mount the resume routes
// All requests to /api/resumes will be handled by resumeRoutes
app.use('/api/resumes', resumeRoutes);

// Define the port the server will listen on
// It tries to get the port from environment variables (e.g., process.env.PORT)
// or defaults to 5000 if not specified
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully!');
    // If MongoDB connection is successful, start the Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    // If MongoDB connection fails, log the error and exit the process
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit with a failure code
  });


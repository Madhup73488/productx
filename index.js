const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

// Load environment variables from .env file
dotenv.config();

// Initialize Express
const app = express();

const cors = require('cors');
app.use(cors({
    origin: 'https://teamprojectx.netlify.app', // Replace with your Netlify domain
    credentials: true,
}));
// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process with a failure code
    });

// Basic route to confirm API is running
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

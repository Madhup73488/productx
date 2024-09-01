const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');

// Load environment variables from .env file
dotenv.config();

// Initialize Express
const app = express();

// CORS configuration
app.use(cors({
    origin: 'https://66d496432d0c7b2883881c14--teamprojectx.netlify.app',
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'], // Allow all standard methods
    credentials: true, // Allow credentials (e.g., cookies, authorization headers)
}));

// Middleware to parse JSON
app.use(express.json());

// Handle pre-flight requests (CORS)
app.options('*', cors());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, // Ensure use of the new URL parser
    useUnifiedTopology: true, // Ensure use of the new Server Discover and Monitoring engine
})
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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

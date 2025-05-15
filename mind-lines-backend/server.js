require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Enable if frontend needs CORS
const connectDB = require('./config/db')

// Initialize Express
const app = express();

// Middleware
app.use(express.json()); 
app.use(cors()); 

// Routes
const authRoutes = require('./routes/authRoutes');
const writerRoutes = require('./routes/writerRoutes');
const adminRoutes = require('./routes/adminRoutes');
const guestRoutes = require('./routes/guestRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/writer', writerRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/guest", guestRoutes);

// Error Handling (Basic)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

// Start Server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }).catch(err => {
    console.error('Failed to start server:', err);
  });
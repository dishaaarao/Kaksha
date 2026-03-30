const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const apiRoutes = require('../backend/routes/api');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('AI Study Assistant API is running!');
});
app.use('/api', apiRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Export for Vercel
module.exports = app;

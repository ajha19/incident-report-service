// src/app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const incidentRoutes = require('./routes/incidents');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/incidents', incidentRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

module.exports = app;

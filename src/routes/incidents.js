// src/routes/incidents.js
const express = require('express');
const router = express.Router();
const store = require('../services/store');

// Validation helper
const validateIncident = (data) => {
    const errors = [];
    if (!data.description || typeof data.description !== 'string' || data.description.trim() === '') {
        errors.push('Description is required');
    }
    if (!data.location || typeof data.location !== 'string' || data.location.trim() === '') {
        errors.push('Location is required');
    }
    const allowedSeverities = ['Low', 'Medium', 'High', 'Critical'];
    if (!data.severity || !allowedSeverities.includes(data.severity)) {
        errors.push(`Severity must be one of: ${allowedSeverities.join(', ')}`);
    }
    return errors;
};

// GET /api/incidents - List all incidents
router.get('/', (req, res) => {
    try {
        const incidents = store.getAllIncidents();
        res.json(incidents);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch incidents' });
    }
});

// GET /api/incidents/:id - Get a single incident
router.get('/:id', (req, res) => {
    try {
        const incident = store.getIncidentById(req.params.id);
        if (!incident) {
            return res.status(404).json({ error: 'Incident not found' });
        }
        res.json(incident);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch incident' });
    }
});

// POST /api/incidents - Create a new incident
router.post('/', (req, res) => {
    try {
        const errors = validateIncident(req.body);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const newIncident = store.addIncident({
            description: req.body.description,
            location: req.body.location,
            severity: req.body.severity
        });

        res.status(201).json(newIncident);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create incident' });
    }
});

// PATCH /api/incidents/:id - Update incident status
router.patch('/:id', (req, res) => {
    try {
        const { status } = req.body;
        const allowedStatuses = ['Open', 'Resolved'];

        if (!status || !allowedStatuses.includes(status)) {
            return res.status(400).json({ error: 'Status must be Open or Resolved' });
        }

        const updatedIncident = store.updateIncidentStatus(req.params.id, status);
        if (!updatedIncident) {
            return res.status(404).json({ error: 'Incident not found' });
        }

        res.json(updatedIncident);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update incident' });
    }
});

module.exports = router;

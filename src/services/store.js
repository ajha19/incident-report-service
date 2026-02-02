// src/services/store.js

// In-memory array to store incidents
// NOTE: This will reset every time the server restarts
let incidents = [];

/**
 * Create a new incident
 * @param {Object} incidentData 
 * @returns {Object} created incident
 */
const addIncident = (incidentData) => {
    const newIncident = {
        id: Date.now().toString(), // Simple ID generation
        createdAt: new Date().toISOString(),
        status: 'Open', // Default status
        ...incidentData
    };
    incidents.push(newIncident);
    return newIncident;
};

/**
 * Get all incidents, sorted by newest first
 * @returns {Array} list of incidents
 */
const getAllIncidents = () => {
    return [...incidents].sort((a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    );
};

/**
 * Get a single incident by ID
 * @param {string} id 
 * @returns {Object|null} incident or null if not found
 */
const getIncidentById = (id) => {
    return incidents.find(inc => inc.id === id) || null;
};

/**
 * Update incident status
 * @param {string} id 
 * @param {string} status 
 * @returns {Object|null} updated incident or null if not found
 */
const updateIncidentStatus = (id, status) => {
    const incident = incidents.find(inc => inc.id === id);
    if (incident) {
        incident.status = status;
        return incident;
    }
    return null;
};

module.exports = {
    addIncident,
    getAllIncidents,
    getIncidentById,
    updateIncidentStatus
};

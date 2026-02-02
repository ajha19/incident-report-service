import React, { useState } from 'react';
import axios from 'axios';

const IncidentForm = ({ onIncidentCreated }) => {
    const [formData, setFormData] = useState({
        description: '',
        location: '',
        severity: 'Low'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await axios.post('/api/incidents', formData);
            setFormData({ description: '', location: '', severity: 'Low' }); // Reset form
            onIncidentCreated(); // Notify parent to refresh list
        } catch (err) {
            setError(err.response?.data?.errors?.join(', ') || 'Failed to create incident');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <h2 style={{ marginTop: 0 }}>Log New Incident</h2>
            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="3"
                        placeholder="Describe what happened..."
                    />
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label>Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Server Room B"
                        />
                    </div>
                    <div className="form-group" style={{ width: '150px' }}>
                        <label>Severity</label>
                        <select name="severity" value={formData.severity} onChange={handleChange}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">Critical</option>
                        </select>
                    </div>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Incident'}
                </button>
            </form>
        </div>
    );
};

export default IncidentForm;

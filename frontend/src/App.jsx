import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IncidentList from './components/IncidentList';
import IncidentForm from './components/IncidentForm';
import IncidentDetail from './components/IncidentDetail';
import DashboardStats from './components/DashboardStats';

function App() {
  const [incidents, setIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIncidents = async () => {
    try {
      const res = await axios.get('/api/incidents');
      setIncidents(res.data);
      // If selected incident is in the list, update it (in case of edits), otherwise keep valid
      if (selectedIncident) {
        const updated = res.data.find(i => i.id === selectedIncident.id);
        if (updated) setSelectedIncident(updated);
      }
    } catch (err) {
      console.error('Failed to fetch incidents', err);
      setError('Failed to connect to backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const handleIncidentCreated = () => {
    fetchIncidents();
  };

  const handleSelect = (incident) => {
    setSelectedIncident(incident);
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.patch(`/api/incidents/${id}`, { status: newStatus });
      fetchIncidents();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 style={{ fontSize: '1.25rem', margin: 0 }}>Incident Response</h1>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#6b7280' }}>
            Internal Tracking System
          </p>
        </div>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
        ) : error ? (
          <div style={{ padding: '1rem', color: 'red' }}>{error}</div>
        ) : (
          <IncidentList
            incidents={incidents}
            onSelect={handleSelect}
            selectedId={selectedIncident?.id}
          />
        )}
      </aside>

      <main className="main-content">
        <DashboardStats incidents={incidents} />

        <div className="content-grid">
          {/* Adjusted layout: Form on left, Details on right for better flow, or stack vertically? */}
          <IncidentForm onIncidentCreated={handleIncidentCreated} />
          <IncidentDetail
            incident={selectedIncident}
            onUpdateStatus={handleStatusUpdate}
          />
        </div>
      </main>
    </div>
  );
}

export default App;

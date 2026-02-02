import React from 'react';

const IncidentDetail = ({ incident, onUpdateStatus }) => {
    if (!incident) {
        return (
            <div className="card empty-state">
                <h3>Select an incident to view details</h3>
                <p>Click on an item in the sidebar to view full report.</p>
            </div>
        );
    }

    const isResolved = incident.status === 'Resolved';

    return (
        <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h2 style={{ margin: 0 }}>Incident Details</h2>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <span style={{
                        fontSize: '1rem',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '999px',
                        background: isResolved ? '#10b981' : '#3b82f6',
                        color: 'white',
                        fontWeight: 500
                    }}>
                        {incident.status}
                    </span>
                    <span className={`badge badge-${incident.severity}`} style={{ fontSize: '1rem' }}>
                        {incident.severity}
                    </span>
                </div>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                    <label style={{ color: 'var(--text-muted)' }}>ID</label>
                    <div>{incident.id}</div>
                </div>
                <div>
                    <label style={{ color: 'var(--text-muted)' }}>Location</label>
                    <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>{incident.location}</div>
                </div>
                <div>
                    <label style={{ color: 'var(--text-muted)' }}>Reported At</label>
                    <div>{new Date(incident.createdAt).toLocaleString()}</div>
                </div>
                <div>
                    <label style={{ color: 'var(--text-muted)' }}>Description</label>
                    <div style={{ background: '#f9fafb', padding: '1rem', borderRadius: '0.375rem', marginTop: '0.5rem' }}>
                        {incident.description}
                    </div>
                </div>

                <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                    {isResolved ? (
                        <button
                            onClick={() => onUpdateStatus(incident.id, 'Open')}
                            style={{ background: 'var(--warning)', color: 'white' }}
                        >
                            Reopen Incident
                        </button>
                    ) : (
                        <button
                            onClick={() => onUpdateStatus(incident.id, 'Resolved')}
                            style={{ background: 'var(--success)', color: 'white' }}
                        >
                            Mark as Resolved
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IncidentDetail;

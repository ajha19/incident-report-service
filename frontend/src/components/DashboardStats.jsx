import React from 'react';

const DashboardStats = ({ incidents }) => {
    const total = incidents.length;
    const open = incidents.filter(i => i.status === 'Open').length;
    const critical = incidents.filter(i => i.severity === 'Critical' && i.status === 'Open').length;
    const resolved = incidents.filter(i => i.status === 'Resolved').length;

    return (
        <div className="stats-grid">
            <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Incidents</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{total}</div>
            </div>
            <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Open</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>{open}</div>
            </div>
            <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Active Critical</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--danger)' }}>{critical}</div>
            </div>
            <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Resolved</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--success)' }}>{resolved}</div>
            </div>
        </div>
    );
};

export default DashboardStats;

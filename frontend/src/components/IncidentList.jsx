import React, { useState } from 'react';

const IncidentList = ({ incidents, onSelect, selectedId }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [severityFilter, setSeverityFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredIncidents = incidents.filter(incident => {
        const matchesSearch = incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            incident.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSeverity = severityFilter === 'All' || incident.severity === severityFilter;
        const matchesStatus = statusFilter === 'All' || incident.status === statusFilter;
        return matchesSearch && matchesSeverity && matchesStatus;
    });

    return (
        <div className="incident-list-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>
                <input
                    type="text"
                    placeholder="Search incidents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginBottom: '0.75rem' }}
                />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <select
                        value={severityFilter}
                        onChange={(e) => setSeverityFilter(e.target.value)}
                        style={{ fontSize: '0.85rem', padding: '0.25rem' }}
                    >
                        <option value="All">All Severities</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{ fontSize: '0.85rem', padding: '0.25rem' }}
                    >
                        <option value="All">All Statuses</option>
                        <option value="Open">Open</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </div>
            </div>

            <div className="incident-list" style={{ flex: 1, overflowY: 'auto' }}>
                {filteredIncidents.length === 0 ? (
                    <div className="p-4 text-center text-gray-500" style={{ padding: '2rem', textAlign: 'center', opacity: 0.6 }}>
                        No matching incidents.
                    </div>
                ) : (
                    filteredIncidents.map((incident) => (
                        <div
                            key={incident.id}
                            className={`incident-item ${selectedId === incident.id ? 'active' : ''}`}
                            onClick={() => onSelect(incident)}
                            style={{ opacity: incident.status === 'Resolved' ? 0.6 : 1 }}
                        >
                            <div className="incident-meta">
                                <span>#{incident.id.slice(-4)}</span>
                                <span>{new Date(incident.createdAt).toLocaleTimeString()}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: 500 }}>{incident.location}</span>
                                <span className={`badge badge-${incident.severity}`}>{incident.severity}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
                                <div style={{ fontSize: '0.9rem', color: '#4b5563', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, marginRight: '0.5rem' }}>
                                    {incident.description}
                                </div>
                                {incident.status === 'Resolved' && (
                                    <span style={{ fontSize: '0.7rem', background: '#d1fae5', color: '#065f46', padding: '0 0.25rem', borderRadius: '4px' }}>
                                        Resolved
                                    </span>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default IncidentList;

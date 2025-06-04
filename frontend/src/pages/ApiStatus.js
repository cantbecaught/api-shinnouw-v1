import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pages.css';

const ApiStatus = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get('https://api-shinnouw.vercel.app/api/status');
        setStatus(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="page-container">Loading...</div>;
  if (error) return <div className="page-container">Error: {error}</div>;

  return (
    <div className="page-container">
      <h2>API Status</h2>
      
      <div className="card">
        <h3>Current System Status</h3>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            backgroundColor: status.status === 'operational' ? '#28a745' : '#dc3545',
            marginRight: '0.75rem'
          }} />
          <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
            {status.status === 'operational' ? 'All Systems Operational' : 'Service Degradation'}
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div className="card" style={{ padding: '1rem' }}>
            <h4>Uptime</h4>
            <p>{status.uptime.human}</p>
          </div>
          
          <div className="card" style={{ padding: '1rem' }}>
            <h4>Version</h4>
            <p>{status.version}</p>
          </div>
          
          <div className="card" style={{ padding: '1rem' }}>
            <h4>Endpoints</h4>
            <p>{status.endpoints.operational} / {status.endpoints.total} operational</p>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h3>API Endpoints Status</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ textAlign: 'left', padding: '0.75rem' }}>Service</th>
              <th style={{ textAlign: 'left', padding: '0.75rem' }}>Status</th>
              <th style={{ textAlign: 'left', padding: '0.75rem' }}>Last Checked</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '0.75rem' }}>OrderKuota Gateway</td>
              <td style={{ padding: '0.75rem' }}>
                <span style={{ 
                  color: '#28a745',
                  fontWeight: 'bold'
                }}>Operational</span>
              </td>
              <td style={{ padding: '0.75rem' }}>{new Date(status.timestamp).toLocaleTimeString()}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '0.75rem' }}>Saweria Gateway</td>
              <td style={{ padding: '0.75rem' }}>
                <span style={{ 
                  color: '#28a745',
                  fontWeight: 'bold'
                }}>Operational</span>
              </td>
              <td style={{ padding: '0.75rem' }}>{new Date(status.timestamp).toLocaleTimeString()}</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem' }}>Core API</td>
              <td style={{ padding: '0.75rem' }}>
                <span style={{ 
                  color: '#28a745',
                  fontWeight: 'bold'
                }}>Operational</span>
              </td>
              <td style={{ padding: '0.75rem' }}>{new Date(status.timestamp).toLocaleTimeString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApiStatus;
import React from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

const Home = () => {
  return (
    <div className="page-container">
      <div className="card">
        <h2>Welcome to API Shinnouw</h2>
        <p>A simple and modern API service for your projects.</p>
        
        <div style={{ marginTop: '2rem' }}>
          <h3>Available Services:</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
            <div className="card">
              <h4>OrderKuota Gateway</h4>
              <p>Create and check payment for your order quota</p>
              <Link to="/orderkuota">
                <button style={{ marginTop: '1rem' }}>Go to OrderKuota</button>
              </Link>
            </div>
            
            <div className="card">
              <h4>Saweria Gateway</h4>
              <p>Integration with Saweria payment system</p>
              <Link to="/saweria">
                <button style={{ marginTop: '1rem' }}>Go to Saweria</button>
              </Link>
            </div>
            
            <div className="card">
              <h4>API Status</h4>
              <p>Check the current status of our API services</p>
              <Link to="/status">
                <button style={{ marginTop: '1rem' }}>Check Status</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h3>API Documentation</h3>
        <p>For detailed API documentation, please visit our API endpoints directly:</p>
        <ul style={{ marginTop: '1rem', marginLeft: '1.5rem' }}>
          <li><code>POST /api/orderkuota/create</code></li>
          <li><code>GET /api/orderkuota/check/:id</code></li>
          <li><code>POST /api/saweria/login</code></li>
          <li><code>POST /api/saweria/create</code></li>
          <li><code>GET /api/saweria/check/:id</code></li>
          <li><code>GET /api/status</code></li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
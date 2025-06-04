import React, { useState } from 'react';
import axios from 'axios';
import './Pages.css';

const Saweria = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [token, setToken] = useState('');
  const [paymentData, setPaymentData] = useState(null);
  const [checkResult, setCheckResult] = useState(null);
  const [activeTab, setActiveTab] = useState('login');

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://api-shinnouw.vercel.app/api/saweria/login',
        loginData
      );
      setToken(response.data.data.token);
      setActiveTab('create');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const amount = formData.get('amount');
    const message = formData.get('message');
    
    try {
      const response = await axios.post(
        'https://api-shinnouw.vercel.app/api/saweria/create',
        { amount, message },
        { headers: { Authorization: token } }
      );
      setPaymentData(response.data.data);
    } catch (error) {
      console.error('Payment creation error:', error);
      alert('Failed to create payment. Please try again.');
    }
  };

  const handleCheckPayment = async (paymentId) => {
    try {
      const response = await axios.get(
        `https://api-shinnouw.vercel.app/api/saweria/check/${paymentId}`
      );
      setCheckResult(response.data.data);
    } catch (error) {
      console.error('Check payment error:', error);
      alert('Failed to check payment status.');
    }
  };

  return (
    <div className="page-container">
      <h2>Saweria Gateway</h2>
      
      <div className="tabs" style={{ display: 'flex', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <button 
          onClick={() => setActiveTab('login')} 
          style={{ 
            padding: '0.75rem 1.5rem', 
            background: activeTab === 'login' ? 'var(--primary-color)' : 'transparent', 
            color: activeTab === 'login' ? 'white' : 'var(--text-color)',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px 4px 0 0'
          }}
        >
          Login
        </button>
        <button 
          onClick={() => token ? setActiveTab('create') : alert('Please login first')} 
          style={{ 
            padding: '0.75rem 1.5rem', 
            background: activeTab === 'create' ? 'var(--primary-color)' : 'transparent', 
            color: activeTab === 'create' ? 'white' : 'var(--text-color)',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px 4px 0 0'
          }}
        >
          Create Payment
        </button>
        {paymentData && (
          <button 
            onClick={() => setActiveTab('check')} 
            style={{ 
              padding: '0.75rem 1.5rem', 
              background: activeTab === 'check' ? 'var(--primary-color)' : 'transparent', 
              color: activeTab === 'check' ? 'white' : 'var(--text-color)',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '4px 4px 0 0'
            }}
          >
            Check Payment
          </button>
        )}
      </div>

      {activeTab === 'login' && (
        <div className="card">
          <h3>Login to Saweria</h3>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      )}

      {activeTab === 'create' && (
        <div className="card">
          <h3>Create Saweria Payment</h3>
          <form onSubmit={handlePaymentSubmit}>
            <div className="form-group">
              <label>Amount:</label>
              <input
                type="number"
                name="amount"
                required
              />
            </div>
            <div className="form-group">
              <label>Message (optional):</label>
              <textarea
                name="message"
                rows="3"
              />
            </div>
            <button type="submit">Create Payment</button>
          </form>
        </div>
      )}

      {paymentData && activeTab === 'check' && (
        <div className="card result-card">
          <h3>Payment Status</h3>
          <button onClick={() => handleCheckPayment(paymentData.payment_id)} style={{ marginBottom: '1rem' }}>
            Refresh Status
          </button>
          
          {checkResult ? (
            <div>
              <p><strong>Payment ID:</strong> {checkResult.id}</p>
              <p><strong>Amount:</strong> {checkResult.amount}</p>
              <p><strong>Status:</strong> 
                <span style={{ 
                  color: checkResult.status === 'completed' ? 'green' : 'orange',
                  fontWeight: 'bold',
                  marginLeft: '0.5rem'
                }}>
                  {checkResult.status.toUpperCase()}
                </span>
              </p>
              <p><strong>Created At:</strong> {new Date(checkResult.created_at).toLocaleString()}</p>
              <p><strong>Payment URL:</strong> 
                <a href={`https://saweria.co/payments/${checkResult.id}`} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '0.5rem' }}>
                  Open in Saweria
                </a>
              </p>
            </div>
          ) : (
            <p>Click "Refresh Status" to check payment status</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Saweria;
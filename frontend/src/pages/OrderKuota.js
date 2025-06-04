import React, { useState } from 'react';
import axios from 'axios';
import './Pages.css';

const OrderKuota = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [formData, setFormData] = useState({
    amount: '',
    customer_id: '',
    product_id: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://api-shinnouw.vercel.app/api/orderkuota/create',
        formData
      );
      setPaymentData(response.data.data);
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };

  return (
    <div className="page-container">
      <h2>OrderKuota Gateway</h2>
      
      <div className="card">
        <h3>Create Payment</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Amount:</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Customer ID:</label>
            <input
              type="text"
              name="customer_id"
              value={formData.customer_id}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Product ID:</label>
            <input
              type="text"
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Create Payment</button>
        </form>
      </div>

      {paymentData && (
        <div className="card result-card">
          <h3>Payment Created</h3>
          <p><strong>Payment ID:</strong> {paymentData.payment_id}</p>
          <p><strong>Payment URL:</strong> 
            <a href={paymentData.payment_url} target="_blank" rel="noopener noreferrer">
              {paymentData.payment_url}
            </a>
          </p>
          <img src={paymentData.qr_code} alt="Payment QR Code" />
        </div>
      )}
    </div>
  );
};

export default OrderKuota;
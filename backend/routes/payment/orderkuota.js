const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Mock database
const payments = {};

// Create Payment
router.post('/create', (req, res) => {
  const { amount, customer_id, product_id } = req.body;
  
  if (!amount || !customer_id || !product_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const paymentId = uuidv4();
  const paymentData = {
    id: paymentId,
    amount,
    customer_id,
    product_id,
    status: 'pending',
    created_at: new Date().toISOString()
  };

  payments[paymentId] = paymentData;

  res.json({
    status: 'success',
    message: 'Payment created',
    data: {
      payment_id: paymentId,
      payment_url: `https://api-shinnouw.vercel.app/api/orderkuota/check/${paymentId}`,
      qr_code: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${paymentId}`,
      expires_in: 3600 // 1 hour
    }
  });
});

// Check Payment
router.get('/check/:id', (req, res) => {
  const paymentId = req.params.id;
  const payment = payments[paymentId];

  if (!payment) {
    return res.status(404).json({ error: 'Payment not found' });
  }

  // Simulate payment status change
  if (payment.status === 'pending' && Math.random() > 0.7) {
    payment.status = 'completed';
  }

  res.json({
    status: 'success',
    data: payment
  });
});

module.exports = router;
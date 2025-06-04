const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Mock database
const users = {
  'user@example.com': { password: 'password123', token: 'user_token_123' }
};
const saweriaPayments = {};

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  const user = users[email];
  
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({
    status: 'success',
    data: {
      token: user.token,
      expires_in: 86400 // 24 hours
    }
  });
});

// Middleware untuk auth
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token || !Object.values(users).some(u => u.token === token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  next();
};

// Create Payment (protected)
router.post('/create', authenticate, (req, res) => {
  const { amount, message } = req.body;
  
  if (!amount) {
    return res.status(400).json({ error: 'Amount is required' });
  }

  const paymentId = uuidv4();
  const paymentData = {
    id: paymentId,
    amount,
    message: message || '',
    status: 'pending',
    created_at: new Date().toISOString()
  };

  saweriaPayments[paymentId] = paymentData;

  res.json({
    status: 'success',
    data: {
      payment_id: paymentId,
      payment_url: `https://saweria.co/payments/${paymentId}`,
      check_url: `https://api-shinnouw.vercel.app/api/saweria/check/${paymentId}`
    }
  });
});

// Check Payment
router.get('/check/:id', (req, res) => {
  const paymentId = req.params.id;
  const payment = saweriaPayments[paymentId];

  if (!payment) {
    return res.status(404).json({ error: 'Payment not found' });
  }

  // Simulate payment status change
  if (payment.status === 'pending' && Math.random() > 0.5) {
    payment.status = 'completed';
  }

  res.json({
    status: 'success',
    data: payment
  });
});

module.exports = router;
const express = require('express');
const router = express.Router();

// Main API routes
router.get('/', (req, res) => {
  res.json({
    status: 'API is running',
    message: 'Welcome to api-shinnouw.vercel.app',
    endpoints: {
      orderkuota: {
        create_payment: 'POST /api/orderkuota/create',
        check_payment: 'GET /api/orderkuota/check/:id'
      },
      saweria: {
        login: 'POST /api/saweria/login',
        create_payment: 'POST /api/saweria/create',
        check_payment: 'GET /api/saweria/check/:id'
      },
      api_status: 'GET /api/status'
    },
    documentation: 'https://api-shinnouw.vercel.app/docs'
  });
});

// Sub-routes
router.use('/orderkuota', require('./payment/orderkuota'));
router.use('/saweria', require('./payment/saweria'));
router.use('/status', require('./api'));

module.exports = router;
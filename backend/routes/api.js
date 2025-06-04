const express = require('express');
const router = express.Router();

router.get('/status', (req, res) => {
  const uptime = process.uptime();
  
  res.json({
    status: 'operational',
    uptime: {
      seconds: uptime,
      human: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${Math.floor(uptime % 60)}s`
    },
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      total: 7,
      operational: 7,
      degraded: 0
    }
  });
});

module.exports = router;
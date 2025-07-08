const express = require('express');
const router = express.Router();
const ticketController = require('../controller/ticketController');
const { authenticateUser } = require('../middleware/AuthMiddleware');

// Get ticket for a specific event by logged-in user
router.get('/ticket/:eventId', authenticateUser, ticketController.getTicketByEvent);

// Optional: QR image download route (used in email)
const path = require('path');
const fs = require('fs');

router.get('/ticket/download/:ticketId', (req, res) => {
  const ticketId = req.params.ticketId;
  const filePath = path.join(__dirname, `../qrcodes/${ticketId}.png`);

  if (fs.existsSync(filePath)) {
    return res.download(filePath, `${ticketId}_QR.png`);
  } else {
    return res.status(404).json({ message: 'QR not found or expired' });
  }
});

module.exports = router;

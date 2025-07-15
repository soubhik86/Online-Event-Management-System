const express = require('express');
const router = express.Router();
const registrationController = require('../controller/registrationController');
const { authenticateUser } = require('../middleware/AuthMiddleware');

// ✅ Route: Register the current user for a specific event
// Endpoint: POST /register/:eventId
router.post('/register/:eventId', authenticateUser, registrationController.registerForEvent);

// ✅ Route: Get all registrations for the currently logged-in user
// Endpoint: GET /my-registrations
router.get('/my-registrations', authenticateUser, registrationController.getMyRegistrations);

module.exports = router;

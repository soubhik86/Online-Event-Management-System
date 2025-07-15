const express = require('express');
const router = express.Router();
const eventController = require('../controller/eventControllerUser');
const { authenticateUser, authorizeRoles } = require('../middleware/AuthMiddleware');
const upload = require('../helper/uploadImage');

router.get('/events', eventController.getAllEvents);
router.get('/events/:id', eventController.getEventById);



module.exports = router;
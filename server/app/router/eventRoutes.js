const express = require('express');
const router = express.Router();
const EventController = require('../controller/eventController');
const upload = require('../helper/uploadImage');
const { AuthCheck } = require("../middleware/AuthMiddleware")

// List all events
router.get('/', AuthCheck, EventController.list);

// Create a new event
router.get('/add', AuthCheck, EventController.create);
router.post('/add', upload.single('image'), EventController.store);
router.get('/edit/:id', EventController.edit);
router.post('/edit/:id', upload.single('image'), EventController.update);
router.get('/delete/:id', EventController.remove);



module.exports = router;

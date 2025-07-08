const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const upload = require('../helper/uploadImage');
const { authenticateUser } = require("../middleware/AuthMiddleware")

router.post('/register',upload.single('profilePicture'), authController.register);
router.post('/verify-email', authController.verifyEmail);
router.post('/login',  authController.login);
router.post('/forgot-password',  authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/update-profile', authenticateUser, upload.single('profilePicture'), authController.updateProfile)

 

module.exports = router;

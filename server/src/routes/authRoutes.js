const express = require('express');
const router = express.Router();
const { login, getMe } = require('../controllers/authController');
const { verifyAdminToken } = require('../middleware/auth');

// Public route: Admin sign-in
router.post('/login', login);

// Protected route: Check current admin session
router.get('/me', verifyAdminToken, getMe);

module.exports = router;

const express = require('express');
const AuthController = require('../controllers/AuthController');
const { authenticateToken } = require('../middleware/jwtMiddleware');

const router = express.Router();

// Public routes
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

// Protected routes
router.get('/auth/verify', authenticateToken, AuthController.verifyToken);
router.post('/auth/logout', authenticateToken, AuthController.logout);
router.post('/auth/change-password', authenticateToken, AuthController.changePassword);

module.exports = router;

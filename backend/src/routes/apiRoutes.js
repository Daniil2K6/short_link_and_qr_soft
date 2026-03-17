const express = require('express');
const LinkController = require('../controllers/LinkController');
const { authenticateToken } = require('../middleware/jwtMiddleware');
const rateLimitMiddleware = require('../middleware/rateLimitMiddleware');

const router = express.Router();

// Create a short link (authenticated, with rate limiting)
router.post('/links', authenticateToken, rateLimitMiddleware, LinkController.createLink);

// Get all links (for guests - public)
router.get('/links', LinkController.getLinks);

// Get user's links (authenticated)
router.get('/links/user/my-links', authenticateToken, LinkController.getUserLinks);

// Get link statistics
router.get('/links/:id/stats', LinkController.getLinkStats);

// Get QR code as data URL
router.get('/links/:id/qrcode', LinkController.getQRCode);

// Get QR code as image
router.get('/links/:id/qrcode/image', LinkController.getQRCodeImage);

// Delete a user's own link (authenticated)
router.delete('/links/:id', authenticateToken, LinkController.deleteUserLink);

module.exports = router;

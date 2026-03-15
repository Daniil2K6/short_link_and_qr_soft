const express = require('express');
const LinkController = require('../controllers/LinkController');
const rateLimitMiddleware = require('../middleware/rateLimitMiddleware');

const router = express.Router();

// Create a short link
router.post('/links', rateLimitMiddleware, LinkController.createLink);

// Get all links
router.get('/links', LinkController.getLinks);

// Get link statistics
router.get('/links/:id/stats', LinkController.getLinkStats);

// Get QR code as data URL
router.get('/links/:id/qrcode', LinkController.getQRCode);

// Get QR code as image
router.get('/links/:id/qrcode/image', LinkController.getQRCodeImage);

module.exports = router;

const express = require('express');
const LinkController = require('../controllers/LinkController');

const router = express.Router();

// Redirect short link - this must be last to avoid conflicts
router.get('/:shortCode', LinkController.redirectLink);

module.exports = router;

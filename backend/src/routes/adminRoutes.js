const express = require('express');
const AdminController = require('../controllers/AdminController');

const router = express.Router();

// Admin endpoints
router.get('/admin/links', AdminController.getAllLinks);
router.get('/admin/links/search', AdminController.searchLinks);
router.get('/admin/links/:id/stats', AdminController.getLinkStats);
router.patch('/admin/links/:id', AdminController.updateLink);
router.delete('/admin/links/:id', AdminController.deleteLink);

module.exports = router;

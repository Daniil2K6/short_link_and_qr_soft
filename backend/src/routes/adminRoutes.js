const express = require('express');
const AdminController = require('../controllers/AdminController');
const { authenticateToken, requireRole } = require('../middleware/jwtMiddleware');

const router = express.Router();

// Admin middleware - check if user is admin
const adminOnly = (req, res, next) => {
  authenticateToken(req, res, () => {
    requireRole('admin')(req, res, next);
  });
};

// ===== LINKS MANAGEMENT =====
router.get('/admin/links', adminOnly, AdminController.getAllLinks);
router.get('/admin/links/search', adminOnly, AdminController.searchLinks);
router.get('/admin/links/:id/stats', adminOnly, AdminController.getLinkStats);
router.patch('/admin/links/:id', adminOnly, AdminController.updateLink);
router.delete('/admin/links/:id', adminOnly, AdminController.deleteLink);

// ===== USERS MANAGEMENT =====
router.get('/admin/users', adminOnly, AdminController.getAllUsers);
router.get('/admin/users/:userId', adminOnly, AdminController.getUserDetails);
router.delete('/admin/users/:userId', adminOnly, AdminController.deleteUser);
router.patch('/admin/users/:userId/role', adminOnly, AdminController.updateUserRole);

module.exports = router;

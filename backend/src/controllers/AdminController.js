const Link = require('../models/Link');
const User = require('../models/User');

class AdminController {
  // ===== LINKS MANAGEMENT =====

  static async getAllLinks(req, res) {
    try {
      const limit = Math.min(parseInt(req.query.limit) || 20, 100);
      const offset = parseInt(req.query.offset) || 0;

      const links = await Link.getAll(limit, offset);

      res.json({
        links: links.map(link => ({
          id: link.id,
          shortCode: link.short_code,
          originalUrl: link.original_url,
          clickCount: link.click_count,
          status: link.status,
          createdAt: link.created_at,
          ipAddress: link.ip_address,
          userId: link.user_id
        })),
        limit,
        offset
      });
    } catch (error) {
      console.error('Error fetching links:', error);
      res.status(500).json({ error: 'Failed to fetch links' });
    }
  }

  static async searchLinks(req, res) {
    try {
      const { q } = req.query;

      if (!q) {
        return res.status(400).json({ error: 'Search query is required' });
      }

      const results = await Link.search(q);

      res.json({
        results: results.map(link => ({
          id: link.id,
          shortCode: link.short_code,
          originalUrl: link.original_url,
          clickCount: link.click_count,
          status: link.status,
          createdAt: link.created_at
        }))
      });
    } catch (error) {
      console.error('Error searching links:', error);
      res.status(500).json({ error: 'Failed to search links' });
    }
  }

  static async updateLink(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ error: 'Status is required' });
      }

      if (!['active', 'blocked', 'inactive'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }

      const link = await Link.updateStatus(id, status);

      if (!link) {
        return res.status(404).json({ error: 'Link not found' });
      }

      res.json({
        id: link.id,
        shortCode: link.short_code,
        status: link.status,
        message: 'Link updated successfully'
      });
    } catch (error) {
      console.error('Error updating link:', error);
      res.status(500).json({ error: 'Failed to update link' });
    }
  }

  static async deleteLink(req, res) {
    try {
      const { id } = req.params;

      const link = await Link.delete(id);

      if (!link) {
        return res.status(404).json({ error: 'Link not found' });
      }

      res.json({
        message: 'Link deleted successfully',
        deletedLinkId: link.id
      });
    } catch (error) {
      console.error('Error deleting link:', error);
      res.status(500).json({ error: 'Failed to delete link' });
    }
  }

  static async getLinkStats(req, res) {
    try {
      const { id } = req.params;
      const stats = await Link.getStats(id);

      if (!stats.link) {
        return res.status(404).json({ error: 'Link not found' });
      }

      res.json({
        id: stats.link.id,
        shortCode: stats.link.short_code,
        originalUrl: stats.link.original_url,
        clickCount: stats.link.click_count,
        status: stats.link.status,
        createdAt: stats.link.created_at,
        clicksByDate: stats.clicks,
        sourceStats: stats.sourceStats
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      res.status(500).json({ error: 'Failed to fetch statistics' });
    }
  }

  // ===== USERS MANAGEMENT =====

  static async getAllUsers(req, res) {
    try {
      const limit = Math.min(parseInt(req.query.limit) || 20, 100);
      const offset = parseInt(req.query.offset) || 0;

      const users = await User.getAll(limit, offset);

      res.json({
        users: users.map(user => ({
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          createdAt: user.created_at
        })),
        limit,
        offset
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }

  static async getUserDetails(req, res) {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const userLinks = await Link.findByUserId(userId);

      res.json({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          createdAt: user.created_at
        },
        links: userLinks.map(link => ({
          id: link.id,
          shortCode: link.short_code,
          originalUrl: link.original_url,
          clickCount: link.click_count,
          status: link.status,
          createdAt: link.created_at
        })),
        linkCount: userLinks.length
      });
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ error: 'Failed to fetch user details' });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { userId } = req.params;

      // Get user to check if exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Delete user's links first
      const userLinks = await Link.findByUserId(userId);
      for (const link of userLinks) {
        await Link.delete(link.id);
      }

      // Delete user
      const deletedUser = await User.delete(userId);

      res.json({
        message: 'User and all their links deleted successfully',
        deletedUserId: deletedUser.id,
        deletedLinksCount: userLinks.length
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }

  static async updateUserRole(req, res) {
    try {
      const { userId } = req.params;
      const { role } = req.body;

      if (!role || !['admin', 'user'].includes(role)) {
        return res.status(400).json({ error: 'Valid role is required (admin or user)' });
      }

      const user = await User.updateRole(userId, role);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({
        message: 'User role updated successfully',
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Error updating user role:', error);
      res.status(500).json({ error: 'Failed to update user role' });
    }
  }
}

module.exports = AdminController;

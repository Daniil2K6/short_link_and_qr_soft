const Link = require('../models/Link');

class AdminController {
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
          ipAddress: link.ip_address
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
}

module.exports = AdminController;

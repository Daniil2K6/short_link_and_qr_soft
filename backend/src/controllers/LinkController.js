const Link = require('../models/Link');
const Click = require('../models/Click');
const ShortCodeService = require('../services/ShortCodeService');
const QRCodeService = require('../services/QRCodeService');

class LinkController {
  static async createLink(req, res) {
    try {
      const { originalUrl } = req.body;
      const userId = req.user ? req.user.userId : null;
      const ipAddress = req.ip || req.connection.remoteAddress;

      if (!originalUrl) {
        return res.status(400).json({ error: 'Original URL is required' });
      }

      if (!ShortCodeService.isValidUrl(originalUrl)) {
        return res.status(400).json({ error: 'Invalid URL format' });
      }

      // Check if the URL is already a shortened link
      const serverUrl = process.env.SERVER_URL || 'http://localhost:3000';
      const isShortenedUrl = LinkController.isShortenedUrl(originalUrl, serverUrl);
      if (isShortenedUrl) {
        return res.status(400).json({ error: 'Cannot shorten an already shortened URL' });
      }

      // Check if this URL already exists as an active link (for this user if authenticated)
      const existingLink = await Link.findByOriginalUrl(originalUrl);
      if (existingLink && (userId === null || existingLink.user_id === userId)) {
        return res.status(201).json({
          id: existingLink.id,
          shortCode: existingLink.short_code,
          originalUrl: existingLink.original_url,
          createdAt: existingLink.created_at,
          shortUrl: `${serverUrl}/${existingLink.short_code}`,
          isExisting: true
        });
      }

      // Generate new short code if not already existing
      let shortCode = ShortCodeService.generateShortCode();
      let codeExists = await Link.findByShortCode(shortCode);

      // Ensure unique short code
      while (codeExists) {
        shortCode = ShortCodeService.generateShortCode();
        codeExists = await Link.findByShortCode(shortCode);
      }

      const link = await Link.create(shortCode, originalUrl, userId, ipAddress);

      res.status(201).json({
        id: link.id,
        shortCode: link.short_code,
        originalUrl: link.original_url,
        createdAt: link.created_at,
        shortUrl: `${process.env.SERVER_URL || 'http://localhost:3000'}/${link.short_code}`
      });
    } catch (error) {
      console.error('Error creating link:', error);
      res.status(500).json({ error: 'Failed to create link' });
    }
  }

  static async redirectLink(req, res) {
    try {
      const { shortCode } = req.params;
      const link = await Link.findByShortCode(shortCode);

      if (!link) {
        return res.status(404).json({ error: 'Link not found' });
      }

      if (link.status !== 'active') {
        return res.status(410).json({ error: 'This link is no longer available' });
      }

      // Record the click
      const ipAddress = req.ip || req.connection.remoteAddress;
      const userAgent = req.get('User-Agent') || '';
      const referer = req.get('Referer') || '';
      const source = req.query.source || 'direct';

      await Click.create(link.id, ipAddress, userAgent, referer, source);
      await Link.incrementClickCount(link.id);

      res.redirect(301, link.original_url);
    } catch (error) {
      console.error('Error redirecting link:', error);
      res.status(500).json({ error: 'Failed to redirect' });
    }
  }

  static async getLinks(req, res) {
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
          shortUrl: `${process.env.SERVER_URL || 'http://localhost:3000'}/${link.short_code}`
        })),
        limit,
        offset
      });
    } catch (error) {
      console.error('Error fetching links:', error);
      res.status(500).json({ error: 'Failed to fetch links' });
    }
  }

  static async getUserLinks(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const limit = Math.min(parseInt(req.query.limit) || 20, 100);
      const offset = parseInt(req.query.offset) || 0;

      const links = await Link.findByUserId(req.user.userId);

      res.json({
        links: links.slice(offset, offset + limit).map(link => ({
          id: link.id,
          shortCode: link.short_code,
          originalUrl: link.original_url,
          clickCount: link.click_count,
          status: link.status,
          createdAt: link.created_at,
          shortUrl: `${process.env.SERVER_URL || 'http://localhost:3000'}/${link.short_code}`
        })),
        total: links.length,
        limit,
        offset
      });
    } catch (error) {
      console.error('Error fetching user links:', error);
      res.status(500).json({ error: 'Failed to fetch links' });
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

  static async getQRCode(req, res) {
    try {
      const { id } = req.params;
      const link = await Link.findById(id);

      if (!link) {
        return res.status(404).json({ error: 'Link not found' });
      }

      // Generate QR code with source=qr parameter for tracking
      const qrCodeDataUrl = await QRCodeService.generateQRCode(
        `${process.env.SERVER_URL || 'http://localhost:3000'}/${link.short_code}?source=qr`
      );

      res.json({ qrCode: qrCodeDataUrl });
    } catch (error) {
      console.error('Error generating QR code:', error);
      res.status(500).json({ error: 'Failed to generate QR code' });
    }
  }

  static async getQRCodeImage(req, res) {
    try {
      const { id } = req.params;
      const link = await Link.findById(id);

      if (!link) {
        return res.status(404).json({ error: 'Link not found' });
      }

      // Generate QR code image with source=qr parameter for tracking
      const qrCodeBuffer = await QRCodeService.generateQRCodeBuffer(
        `${process.env.SERVER_URL || 'http://localhost:3000'}/${link.short_code}?source=qr`
      );

      res.contentType('image/png');
      res.send(qrCodeBuffer);
    } catch (error) {
      console.error('Error generating QR code image:', error);
      res.status(500).json({ error: 'Failed to generate QR code' });
    }
  }

  // Helper method to check if a URL is already a shortened URL
  static isShortenedUrl(url, serverUrl) {
    try {
      // Check if URL starts with server domain
      if (url.includes(serverUrl)) {
        // Extract the path after domain
        const urlObj = new URL(url);
        const path = urlObj.pathname.substring(1); // Remove leading /
        
        // Check if path is a valid short code (7 alphanumeric characters)
        const shortCodePattern = /^[a-zA-Z0-9_-]{7}$/;
        if (shortCodePattern.test(path.split('?')[0])) { // Ignore query parameters
          return true;
        }
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  static async deleteUserLink(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.userId;

      // Get the link to verify ownership
      const link = await Link.findById(id);
      if (!link) {
        return res.status(404).json({ error: 'Link not found' });
      }

      // Check if user owns this link
      if (link.user_id !== userId) {
        return res.status(403).json({ error: 'You can only delete your own links' });
      }

      // Delete the link (CASCADE will delete associated clicks)
      const deletedLink = await Link.delete(id);

      res.json({
        message: 'Link deleted successfully',
        link: {
          id: deletedLink.id,
          shortCode: deletedLink.short_code,
          originalUrl: deletedLink.original_url
        }
      });
    } catch (error) {
      console.error('Error deleting link:', error);
      res.status(500).json({ error: 'Failed to delete link' });
    }
  }
}

module.exports = LinkController;

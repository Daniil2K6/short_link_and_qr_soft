const db = require('../database/db');

class Link {
  static async create(shortCode, originalUrl, userId, ipAddress) {
    const query = `
      INSERT INTO links (short_code, original_url, user_id, ip_address)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await db.query(query, [shortCode, originalUrl, userId, ipAddress]);
    return result.rows[0];
  }

  static async findByShortCode(shortCode) {
    const query = 'SELECT * FROM links WHERE short_code = $1;';
    const result = await db.query(query, [shortCode]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT * FROM links WHERE id = $1;';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const query = 'SELECT * FROM links WHERE user_id = $1 ORDER BY created_at DESC;';
    const result = await db.query(query, [userId]);
    return result.rows;
  }

  static async findByOriginalUrl(originalUrl) {
    const query = 'SELECT * FROM links WHERE original_url = $1 AND status = $2 ORDER BY created_at DESC LIMIT 1;';
    const result = await db.query(query, [originalUrl, 'active']);
    return result.rows[0];
  }

  static async getAll(limit = 100, offset = 0) {
    const query = 'SELECT * FROM links ORDER BY created_at DESC LIMIT $1 OFFSET $2;';
    const result = await db.query(query, [limit, offset]);
    return result.rows;
  }

  static async incrementClickCount(id) {
    const query = 'UPDATE links SET click_count = click_count + 1, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *;';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async updateStatus(id, status) {
    const query = 'UPDATE links SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *;';
    const result = await db.query(query, [status, id]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM links WHERE id = $1 RETURNING *;';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async search(query, limit = 100) {
    const searchQuery = `
      SELECT * FROM links 
      WHERE original_url ILIKE $1 OR short_code ILIKE $1
      ORDER BY created_at DESC
      LIMIT $2;
    `;
    const result = await db.query(searchQuery, [`%${query}%`, limit]);
    return result.rows;
  }

  static async getStats(id) {
    const linkQuery = 'SELECT * FROM links WHERE id = $1;';
    const link = await db.query(linkQuery, [id]);
    
    const clicksQuery = `
      SELECT 
        COUNT(*) as total_clicks,
        COUNT(DISTINCT ip_address) as unique_visitors,
        DATE(created_at) as click_date
      FROM clicks 
      WHERE link_id = $1
      GROUP BY DATE(created_at)
      ORDER BY click_date DESC;
    `;
    const clicks = await db.query(clicksQuery, [id]);

    const sourceQuery = `
      SELECT 
        source,
        COUNT(*) as count
      FROM clicks 
      WHERE link_id = $1
      GROUP BY source;
    `;
    const sourceStats = await db.query(sourceQuery, [id]);
    
    return {
      link: link.rows[0],
      clicks: clicks.rows,
      sourceStats: sourceStats.rows
    };
  }
}

module.exports = Link;

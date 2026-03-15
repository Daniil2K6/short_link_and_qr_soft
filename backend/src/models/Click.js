const db = require('../database/db');

class Click {
  static async create(linkId, ipAddress, userAgent, referer, source = 'direct') {
    const query = `
      INSERT INTO clicks (link_id, ip_address, user_agent, referer, source)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const result = await db.query(query, [linkId, ipAddress, userAgent, referer, source]);
    return result.rows[0];
  }

  static async getClicksByLinkId(linkId) {
    const query = 'SELECT * FROM clicks WHERE link_id = $1 ORDER BY created_at DESC;';
    const result = await db.query(query, [linkId]);
    return result.rows;
  }

  static async getClickStats(linkId) {
    const query = `
      SELECT 
        COUNT(*) as total_clicks,
        COUNT(DISTINCT ip_address) as unique_visitors
      FROM clicks 
      WHERE link_id = $1;
    `;
    const result = await db.query(query, [linkId]);
    return result.rows[0];
  }
}

module.exports = Click;

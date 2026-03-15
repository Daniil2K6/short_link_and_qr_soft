const db = require('../database/db');

class SpamProtectionService {
  static async checkRateLimit(ipAddress) {
    const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || 15000);
    const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || 10);

    const query = `
      SELECT * FROM rate_limits 
      WHERE ip_address = $1 
      AND last_request_at > NOW() - INTERVAL '1 millisecond' * $2;
    `;
    
    const result = await db.query(query, [ipAddress, windowMs]);
    const record = result.rows[0];

    if (!record) {
      // First request from this IP in the time window
      await db.query(
        `INSERT INTO rate_limits (ip_address, request_count, first_request_at, last_request_at)
         VALUES ($1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
         ON CONFLICT (ip_address) DO UPDATE SET 
         request_count = 1,
         last_request_at = CURRENT_TIMESTAMP;`,
        [ipAddress]
      );
      return { allowed: true, remaining: maxRequests - 1 };
    }

    if (record.request_count >= maxRequests) {
      return { allowed: false, remaining: 0 };
    }

    await db.query(
      `UPDATE rate_limits 
       SET request_count = request_count + 1, 
       last_request_at = CURRENT_TIMESTAMP
       WHERE ip_address = $1;`,
      [ipAddress]
    );

    return { allowed: true, remaining: maxRequests - record.request_count - 1 };
  }

  static async resetRateLimit(ipAddress) {
    await db.query('DELETE FROM rate_limits WHERE ip_address = $1;', [ipAddress]);
  }

  static async cleanupExpiredRateLimits() {
    const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || 15000);
    await db.query(
      `DELETE FROM rate_limits 
       WHERE last_request_at < NOW() - INTERVAL '1 millisecond' * $1;`,
      [windowMs]
    );
  }
}

module.exports = SpamProtectionService;

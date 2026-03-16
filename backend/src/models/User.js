const db = require('../database/db');

class User {
  static async create(email, passwordHash, username) {
    const query = `
      INSERT INTO users (email, password_hash, username, role)
      VALUES ($1, $2, $3, 'user')
      RETURNING id, email, username, role, created_at;
    `;
    const result = await db.query(query, [email, passwordHash, username]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT id, email, username, role, created_at FROM users WHERE id = $1;';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1;';
    const result = await db.query(query, [email]);
    return result.rows[0];
  }

  static async findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = $1;';
    const result = await db.query(query, [username]);
    return result.rows[0];
  }

  static async getAll(limit = 100, offset = 0) {
    const query = 'SELECT id, email, username, role, created_at FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2;';
    const result = await db.query(query, [limit, offset]);
    return result.rows;
  }

  static async delete(id) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING id, email, username;';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async updateRole(id, role) {
    const query = 'UPDATE users SET role = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, email, username, role;';
    const result = await db.query(query, [role, id]);
    return result.rows[0];
  }
}

module.exports = User;

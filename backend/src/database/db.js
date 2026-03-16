const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

const initializeDatabase = async () => {
  const client = await pool.connect();
  
  try {
    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        username VARCHAR(100) UNIQUE NOT NULL,
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Add role column if it doesn't exist (for migration)
    await client.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user';
    `);

    // Create links table
    await client.query(`
      CREATE TABLE IF NOT EXISTS links (
        id SERIAL PRIMARY KEY,
        short_code VARCHAR(50) UNIQUE NOT NULL,
        original_url TEXT NOT NULL,
        user_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        click_count INTEGER DEFAULT 0,
        status VARCHAR(20) DEFAULT 'active',
        ip_address VARCHAR(45)
      );
    `);

    // Create clicks table
    await client.query(`
      CREATE TABLE IF NOT EXISTS clicks (
        id SERIAL PRIMARY KEY,
        link_id INTEGER REFERENCES links(id) ON DELETE CASCADE,
        ip_address VARCHAR(45),
        user_agent TEXT,
        referer VARCHAR(255),
        source VARCHAR(50) DEFAULT 'direct',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create rate limit table
    await client.query(`
      CREATE TABLE IF NOT EXISTS rate_limits (
        id SERIAL PRIMARY KEY,
        ip_address VARCHAR(45) UNIQUE NOT NULL,
        request_count INTEGER DEFAULT 1,
        first_request_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_request_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create indexes for better performance
    await client.query(`CREATE INDEX IF NOT EXISTS idx_links_short_code ON links(short_code);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_links_user_id ON links(user_id);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_clicks_link_id ON clicks(link_id);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_rate_limits_ip ON rate_limits(ip_address);`);

    // Add source column to clicks table if it doesn't exist
    await client.query(`
      ALTER TABLE clicks 
      ADD COLUMN IF NOT EXISTS source VARCHAR(50) DEFAULT 'direct';
    `);

    console.log('✓ Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  pool,
  initializeDatabase,
  query: (text, params) => pool.query(text, params),
};

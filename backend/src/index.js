require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { initializeDatabase } = require('./database/db');
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');
const adminRoutes = require('./routes/adminRoutes');
const redirectRoutes = require('./routes/redirectRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to get client IP
app.use((req, res, next) => {
  req.ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || 
           req.socket.remoteAddress || 
           req.connection.remoteAddress;
  next();
});

// Routes
app.use('/api', authRoutes);
app.use('/api', apiRoutes);
app.use('/api', adminRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Redirect routes - must be after API routes
app.use(redirectRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    console.log('Initializing database...');
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`\n✓ Server running on http://localhost:${PORT}`);
      console.log(`✓ Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
      console.log(`✓ Admin console: npm run admin\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

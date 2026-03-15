const SpamProtectionService = require('../services/SpamProtectionService');

const rateLimitMiddleware = async (req, res, next) => {
  try {
    const ipAddress = req.ip || req.connection.remoteAddress;
    const rateLimit = await SpamProtectionService.checkRateLimit(ipAddress);

    res.set('X-RateLimit-Remaining', rateLimit.remaining);

    if (!rateLimit.allowed) {
      return res.status(429).json({
        error: 'Too many requests. Please try again later.',
        retryAfter: Math.ceil(parseInt(process.env.RATE_LIMIT_WINDOW_MS || 15000) / 1000)
      });
    }

    next();
  } catch (error) {
    console.error('Rate limit middleware error:', error);
    next();
  }
};

module.exports = rateLimitMiddleware;

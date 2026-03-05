const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verify JWT token
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route',
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id);

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User no longer exists',
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// Restrict to admin only
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to perform this action',
      });
    }
    next();
  };
};
// Restrict to specific IP for admin actions
exports.restrictToIp = (req, res, next) => {
  const allowedIp = process.env.ALLOWED_ADMIN_IP;

  if (!allowedIp || allowedIp === 'your-laptop-ip-here') {
    // If not configured, allow access (or could block if preferred)
    // For safety, let's just log a warning but allow for now to prevent lockout
    console.warn('⚠️ ALLOWED_ADMIN_IP not configured in environment variables');
    return next();
  }

  // Get client IP
  // req.ip works for Express, but 'x-forwarded-for' is needed when behind a proxy (like Vercel/Railway)
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  // Handle comma-separated list from x-forwarded-for (first IP is the real client)
  const actualIp = clientIp.includes(',') ? clientIp.split(',')[0].trim() : clientIp;

  if (actualIp !== allowedIp) {
    console.log(`🚫 IP Blocked: ${actualIp} (Expected: ${allowedIp})`);
    return res.status(403).json({
      success: false,
      message: 'Access denied: Unauthorized IP address',
    });
  }

  next();
};

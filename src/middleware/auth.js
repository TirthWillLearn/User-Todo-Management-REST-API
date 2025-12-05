const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma');

// Middleware to verify JWT token from Authorization header
exports.authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      const error = new Error('No Token Provided');
      error.statusCode = 401;
      return next(error);
    }

    const token = authHeader.split(' ')[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.sub;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      const error = new Error('Invalid token (user not found)');
      error.statusCode = 401;
      return next(error);
    }

    req.user = { id: user.id, role: user.role, email: user.email, name: user.name };
    next();
  } catch (err) {
    const error = new Error('Invalid or expired token');
    error.statusCode = 401;
    return next(error);
  }
};

// Middleware to check for required user role (e.g., admin)
exports.checkRole = (requiredRole) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        const error = new Error('No user data in request');
        error.statusCode = 401;
        return next(error);
      }
      if (req.user.role !== requiredRole) {
        const error = new Error('Access denied (insufficient role)');
        error.statusCode = 403;
        return next(error);
      }
      next();
    } catch (err) {
      const error = new Error('Server error during role check');
      error.statusCode = 500;
      return next(error);
    }
  };
};

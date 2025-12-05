const prisma = require('../utils/prisma');

// route GET /api/user/profile
// desc  Return profile for authenticated user
exports.getProfile = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { name: true, email: true, id: true, role: true }
    });
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }
    return res.json({ name: user.name, email: user.email, id: user.id, role: user.role });
  } catch (err) {
    return next(err);
  }
};

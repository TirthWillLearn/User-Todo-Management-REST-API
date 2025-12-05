const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const { registerUser, loginUser } = require('../controllers/authController');

// Register: normalize email, trim strings
router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('name required'),
    body('email').trim().isEmail().withMessage('valid email required').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('password min 6 chars')
  ],
  registerUser
);

// Login
router.post(
  '/login',
  [
    body('email').trim().isEmail().withMessage('valid email required').normalizeEmail(),
    body('password').notEmpty().withMessage('password required')
  ],
  loginUser
);

module.exports = router;

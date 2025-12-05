require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/user');
const todoRoutes = require('./src/routes/todos');

const app = express();
app.use(express.json());

// -----------------------------
// Rate limiter (placed here only)
// -----------------------------
const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 6, // 6 requests per minute per IP for auth routes
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});

// Attach limiter only to /api/auth routes by passing the limiter to the router mounting.
app.use('/api/auth', authLimiter, authRoutes);

// Other routes (user/todos)
app.use('/api/user', userRoutes);
app.use('/api/todos', todoRoutes);

// Health
app.get('/health', (req, res) => res.json({ ok: true }));

// -----------------------------
// Global error handler (placed here only)
// -----------------------------
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';
  if (err.errors && Array.isArray(err.errors)) {
    return res.status(status).json({ errors: err.errors });
  }
  return res.status(status).json({ error: message });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

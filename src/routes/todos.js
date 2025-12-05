const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const {
  createTodo,
  listTodos,
  updateStatus,
  deleteTodo
} = require('../controllers/todoController');

router.use(authMiddleware);

router.post('/', createTodo);
router.get('/', listTodos);
router.patch('/:id', updateStatus);
router.delete('/:id', deleteTodo);

module.exports = router;

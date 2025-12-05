const prisma = require('../utils/prisma');

// route POST /api/todos
exports.createTodo = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      const error = new Error('title is required');
      error.statusCode = 400;
      return next(error);
    }
    const todo = await prisma.todo.create({
      data: {
        title,
        description: description || null,
        userId: req.user.id
      }
    });
    return res.status(201).json(todo);
  } catch (err) {
    return next(err);
  }
};

// route GET /api/todos
exports.listTodos = async (req, res, next) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page) || 1;
    limit = Math.min(parseInt(limit) || 10, 100);
    const skip = (page - 1) * limit;

    const [todos, total] = await Promise.all([
      prisma.todo.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.todo.count({ where: { userId: req.user.id } })
    ]);

    return res.json({
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      data: todos
    });
  } catch (err) {
    return next(err);
  }
};

// route PATCH /api/todos/:id
exports.updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['pending', 'completed'].includes(status)) {
      const error = new Error('Invalid status');
      error.statusCode = 400;
      return next(error);
    }

    const todo = await prisma.todo.findUnique({ where: { id: parseInt(id, 10) } });
    if (!todo || todo.userId !== req.user.id) {
      const error = new Error('Todo not found');
      error.statusCode = 404;
      return next(error);
    }

    const updated = await prisma.todo.update({
      where: { id: parseInt(id, 10) },
      data: { status }
    });

    return res.json(updated);
  } catch (err) {
    return next(err);
  }
};

// route DELETE /api/todos/:id
exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await prisma.todo.findUnique({ where: { id: parseInt(id, 10) } });
    if (!todo || todo.userId !== req.user.id) {
      const error = new Error('Todo not found');
      error.statusCode = 404;
      return next(error);
    }

    await prisma.todo.delete({ where: { id: parseInt(id, 10) } });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    return next(err);
  }
};

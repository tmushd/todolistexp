import Todo from '../models/Todo.js';
import { NotFoundError } from '../utils/errors.js';

export const createTodo = async (req, res, next) => {
  try {
    const todo = new Todo({
      ...req.body,
      user: req.userId,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

export const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!todo) throw new NotFoundError('Todo not found');
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!todo) throw new NotFoundError('Todo not found');
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
import express from 'express';
import { body } from 'express-validator';
import { auth } from '../middleware/auth.js';
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from '../controllers/todos.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

router.use(auth);

router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().optional(),
  ],
  validate,
  createTodo
);

router.get('/', getTodos);

router.patch(
  '/:id',
  [
    body('title').trim().optional(),
    body('description').trim().optional(),
    body('completed').isBoolean().optional(),
  ],
  validate,
  updateTodo
);

router.delete('/:id', deleteTodo);

export default router;
import { Check, Pencil, Trash2, X } from 'lucide-react';
import { Todo } from '../lib/types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onToggle(todo._id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
            ${
              todo.completed
                ? 'bg-green-500 border-green-500'
                : 'border-gray-300 hover:border-green-500'
            }`}
        >
          {todo.completed && <Check className="w-4 h-4 text-white" />}
        </button>
        <div className="flex flex-col">
          <span
            className={`text-gray-800 font-medium ${
              todo.completed ? 'line-through text-gray-500' : ''
            }`}
          >
            {todo.title}
          </span>
          <span className="text-sm text-gray-500">{todo.description}</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onEdit(todo)}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <Pencil className="w-4 h-4 text-gray-500" />
        </button>
        <button
          onClick={() => onDelete(todo._id)}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      </div>
    </div>
  );
}
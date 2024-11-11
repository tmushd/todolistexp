import { useState, useEffect } from 'react';
import { TodoForm } from '../components/TodoForm';
import { TodoItem } from '../components/TodoItem';
import { Todo } from '../lib/types';
import { ListChecks } from 'lucide-react';
import { useAuthStore } from '../lib/store';
import { todos } from '../lib/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function TodoList() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, logout: logoutStore } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const response = await todos.getAll();
      setTodoList(response.data);
    } catch (error) {
      toast.error('Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (data: { title: string; description: string }) => {
    try {
      const response = await todos.create(data);
      setTodoList([response.data, ...todoList]);
      toast.success('Todo added successfully');
    } catch (error) {
      toast.error('Failed to add todo');
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const todo = todoList.find((t) => t._id === id);
      if (!todo) return;

      const response = await todos.update(id, {
        completed: !todo.completed,
      });
      setTodoList(
        todoList.map((todo) => (todo._id === id ? response.data : todo))
      );
    } catch (error) {
      toast.error('Failed to update todo');
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await todos.delete(id);
      setTodoList(todoList.filter((todo) => todo._id !== id));
      toast.success('Todo deleted successfully');
    } catch (error) {
      toast.error('Failed to delete todo');
    }
  };

  const editTodo = async (updatedTodo: Todo) => {
    try {
      const response = await todos.update(updatedTodo._id, updatedTodo);
      setTodoList(
        todoList.map((todo) =>
          todo._id === updatedTodo._id ? response.data : todo
        )
      );
      toast.success('Todo updated successfully');
    } catch (error) {
      toast.error('Failed to update todo');
    }
  };

  const logout = () => {
    logoutStore();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <ListChecks className="w-10 h-10 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900">My Todo List</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user?.name}</span>
            <button
              onClick={logout}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <TodoForm onSubmit={addTodo} />

          <div className="space-y-4">
            {todoList.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))}
            {todoList.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No todos yet. Add one above!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
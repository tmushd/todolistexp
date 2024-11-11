import axios from 'axios';
import { useAuthStore } from './store';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
};

export const todos = {
  create: (data: any) => api.post('/todos', data),
  getAll: () => api.get('/todos'),
  update: (id: string, data: any) => api.patch(`/todos/${id}`, data),
  delete: (id: string) => api.delete(`/todos/${id}`),
};

export default api;
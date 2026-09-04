import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getTasks = () => api.get('/tasks');
export const createTask = (task) => api.post('/tasks', task);
export const updateTaskStatus = (id, status) => api.put(`/tasks/${id}`, { status });
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export default api;
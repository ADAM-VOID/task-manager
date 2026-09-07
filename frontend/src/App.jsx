import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      if (!response.ok) throw new Error('Ошибка загрузки задач');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error loading tasks:', error);
      setError('Не удалось загрузить задачи');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Введите название задачи');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      });

      if (!response.ok) throw new Error('Ошибка создания задачи');
      
      const newTask = await response.json();
      setTasks([newTask, ...tasks]);
      setTitle('');
      setDescription('');
      setError('');
    } catch (error) {
      console.error('Error creating task:', error);
      setError('Не удалось создать задачу');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) throw new Error('Ошибка обновления статуса');
      
      const updatedTask = await response.json();
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Не удалось обновить статус');
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Удалить задачу?')) return;

    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Ошибка удаления задачи');
      
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Не удалось удалить задачу');
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      'new': 'Новая',
      'in_progress': 'В процессе',
      'done': 'Выполнена'
    };
    return labels[status] || status;
  };

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📋 Менеджер задач</h1>
      </header>
      <main className="app-main">
        {error && <div className="error">{error}</div>}

        {/* Форма создания задачи */}
        <div className="task-form">
          <h2>Создать новую задачу</h2>
          <form onSubmit={handleCreateTask}>
            <div className="form-group">
              <label>Название *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Введите название задачи"
              />
            </div>
            <div className="form-group">
              <label>Описание</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Введите описание задачи"
                rows="3"
              />
            </div>
            <button type="submit">Создать задачу</button>
          </form>
        </div>

        {/* Список задач */}
        <div className="task-list">
          <h2>Список задач</h2>
          <div className="task-stats">
            <span>Всего: {tasks.length}</span>
            <span>Новых: {tasks.filter(t => t.status === 'new').length}</span>
            <span>В процессе: {tasks.filter(t => t.status === 'in_progress').length}</span>
            <span>Выполнено: {tasks.filter(t => t.status === 'done').length}</span>
          </div>

          {tasks.length === 0 ? (
            <div className="task-list-empty">
              <p>Нет задач. Создайте свою первую задачу!</p>
            </div>
          ) : (
            <table className="task-table">
              <thead>
                <tr>
                  <th>Задача</th>
                  <th>Статус</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task.id}>
                    <td>
                      <strong>{task.title}</strong>
                      {task.description && (
                        <div className="task-description">{task.description}</div>
                      )}
                    </td>
                    <td>
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      >
                        <option value="new">Новая</option>
                        <option value="in_progress">В процессе</option>
                        <option value="done">Выполнена</option>
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="delete-btn"
                      >
                        DEL
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

export default App; 

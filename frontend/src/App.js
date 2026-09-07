import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
            if (!response.ok) {
                throw new Error('Ошибка загрузки задач');
            }
            const data = await response.json();
            setTasks(data);
            setError('');
        } catch (error) {
            setError('Не удалось загрузить задачи');
            console.error('Error loading tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleTaskCreated = (newTask) => {
        setTasks(prevTasks => [newTask, ...prevTasks]);
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error('Ошибка обновления статуса');
            }

            const updatedTask = await response.json();
            setTasks(prevTasks => 
                prevTasks.map(task => 
                    task.id === id ? updatedTask : task
                )
            );
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Не удалось обновить статус задачи');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Ошибка удаления задачи');
            }

            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('Не удалось удалить задачу');
        }
    };

    if (loading) {
        return <div className="loading">Загрузка...</div>;
    }

    return (
        <div className="app">
            <header className="app-header">
                <h1>Менеджер задач</h1>
            </header>
            <main className="app-main">
                {error && <div className="error">{error}</div>}
                <TaskForm onTaskCreated={handleTaskCreated} />
                <TaskList 
                    tasks={tasks}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                />
            </main>
        </div>
    );
}

export default App;
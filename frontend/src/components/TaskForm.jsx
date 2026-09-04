import React, { useState } from 'react';

const TaskForm = ({ onTaskCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!title.trim()) {
            setError('Название задачи обязательно');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: title.trim(), description: description.trim() }),
            });

            if (!response.ok) {
                throw new Error('Ошибка при создании задачи');
            }

            const newTask = await response.json();
            onTaskCreated(newTask);
            setTitle('');
            setDescription('');
        } catch (error) {
            setError('Не удалось создать задачу. Попробуйте позже.');
            console.error('Error creating task:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="task-form">
            <h2>Создать новую задачу</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Название *</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Введите название задачи"
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Описание</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Введите описание задачи"
                        rows="3"
                        disabled={loading}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Создание...' : 'Создать задачу'}
                </button>
            </form>
        </div>
    );
};

export default TaskForm;
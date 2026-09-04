import React, { useState } from 'react';

const TaskItem = ({ task, onStatusChange, onDelete }) => {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setIsUpdating(true);
        try {
            await onStatusChange(task.id, newStatus);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm(`Вы уверены, что хотите удалить задачу "${task.title}"?`)) {
            await onDelete(task.id);
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

    const getStatusColor = (status) => {
        const colors = {
            'new': 'status-new',
            'in_progress': 'status-in-progress',
            'done': 'status-done'
        };
        return colors[status] || '';
    };

    return (
        <tr className={`task-item ${getStatusColor(task.status)}`}>
            <td>
                <strong>{task.title}</strong>
                {task.description && (
                    <div className="task-description">{task.description}</div>
                )}
            </td>
            <td>
                <div className="task-meta">
                    <span className="task-date">
                        {new Date(task.created_at).toLocaleDateString('ru-RU')}
                    </span>
                </div>
            </td>
            <td>
                <select
                    value={task.status}
                    onChange={handleStatusChange}
                    disabled={isUpdating}
                    className="status-select"
                >
                    <option value="new">Новая</option>
                    <option value="in_progress">В процессе</option>
                    <option value="done">Выполнена</option>
                </select>
            </td>
            <td>
                <button
                    onClick={handleDelete}
                    className="delete-btn"
                    disabled={isUpdating}
                >
                    🗑️
                </button>
            </td>
        </tr>
    );
};

export default TaskItem;
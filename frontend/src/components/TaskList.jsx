import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onStatusChange, onDelete }) => {
    if (tasks.length === 0) {
        return (
            <div className="task-list-empty">
                <p>Нет задач. Создайте свою первую задачу!</p>
            </div>
        );
    }

    return (
        <div className="task-list">
            <h2>Список задач</h2>
            <div className="task-stats">
                <span>Всего: {tasks.length}</span>
                <span>Новых: {tasks.filter(t => t.status === 'new').length}</span>
                <span>В процессе: {tasks.filter(t => t.status === 'in_progress').length}</span>
                <span>Выполнено: {tasks.filter(t => t.status === 'done').length}</span>
            </div>
            <table className="task-table">
                <thead>
                    <tr>
                        <th>Задача</th>
                        <th>Дата создания</th>
                        <th>Статус</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onStatusChange={onStatusChange}
                            onDelete={onDelete}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;
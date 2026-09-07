CREATE DATABASE IF NOT EXISTS task_manager;
USE task_manager;

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('new', 'in_progress', 'done') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO tasks (title, description, status) VALUES
('Изучить React', 'Пройти базовый курс по React', 'in_progress'),
('Настроить MySQL', 'Установить и настроить базу данных', 'new'),
('Написать Python скрипт', 'Создать скрипт для экспорта задач в CSV', 'done');

SELECT * FROM tasks;
DROP DATABASE IF EXISTS task_manager;

CREATE DATABASE task_manager
    ENCODING 'UTF8'
    LC_COLLATE 'Russian_Russia.1251'
    LC_CTYPE 'Russian_Russia.1251'
    TEMPLATE template0;

\c task_manager;

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'done')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, description, status) VALUES
('Изучить React', 'Пройти базовый курс по React', 'in_progress'),
('Настроить PostgreSQL', 'Установить и настроить базу данных', 'new'),
('Написать Python скрипт', 'Создать скрипт для экспорта задач в CSV', 'done');

SELECT * FROM tasks;

\q
-- Удаляем базу если существует
DROP DATABASE IF EXISTS task_manager;

-- Создаем базу с правильной кодировкой
CREATE DATABASE task_manager
    ENCODING 'UTF8'
    LC_COLLATE 'Russian_Russia.1251'
    LC_CTYPE 'Russian_Russia.1251'
    TEMPLATE template0;

-- Подключаемся к базе
\c task_manager;

-- Создаем таблицу
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'done')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Добавляем тестовые данные (без специальных символов)
INSERT INTO tasks (title, description, status) VALUES
('Изучить React', 'Пройти базовый курс по React', 'in_progress'),
('Настроить PostgreSQL', 'Установить и настроить базу данных', 'new'),
('Написать Python скрипт', 'Создать скрипт для экспорта задач в CSV', 'done');

-- Проверяем данные
SELECT * FROM tasks;

-- Выход
\q
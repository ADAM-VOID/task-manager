const { Pool } = require('pg');
require('dotenv').config();

console.log('Настройки подключения:');
console.log(`   Хост: ${process.env.DB_HOST || 'localhost'}`);
console.log(`   Порт: ${process.env.DB_PORT || 5432}`);
console.log(`   База: ${process.env.DB_NAME || 'task_manager'}`);
console.log(`   Пользователь: ${process.env.DB_USER || 'postgres'}`);

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'task_manager',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
    client_encoding: 'UTF8',
    options: '-c client_encoding=UTF8'
});

pool.connect((err, client, release) => {
    if (err) {
        console.error('Ошибка подключения к PostgreSQL:', err.message);
    } else {
        console.log('Подключение к PostgreSQL успешно!');
        release();
    }
});

module.exports = pool;
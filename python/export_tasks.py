#!/usr/bin/env python3
"""
Скрипт для экспорта задач из PostgreSQL в CSV файл
Поддержка UTF-8
"""

import psycopg2
import csv
import os
from datetime import datetime
from dotenv import load_dotenv

def get_db_connection():
    """Подключение к PostgreSQL с правильной кодировкой"""
    load_dotenv()
    
    try:
        conn = psycopg2.connect(
            host=os.getenv('DB_HOST', 'localhost'),
            port=os.getenv('DB_PORT', '5432'),
            database=os.getenv('DB_NAME', 'task_manager'),
            user=os.getenv('DB_USER', 'postgres'),
            password=os.getenv('DB_PASSWORD', ''),
            # Важно: устанавливаем кодировку клиента
            client_encoding='UTF8',
            # Устанавливаем опции для работы с кириллицей
            options='-c client_encoding=UTF8'
        )
        return conn
    except Exception as e:
        print(f"❌ Ошибка подключения: {e}")
        return None

def export_tasks_to_csv():
    """Экспорт задач в CSV с UTF-8"""
    print("🚀 Начинаем экспорт задач из PostgreSQL...")
    print("=" * 50)
    
    conn = get_db_connection()
    if not conn:
        return
    
    try:
        cursor = conn.cursor()
        
        # Проверяем кодировку
        cursor.execute("SHOW client_encoding")
        encoding = cursor.fetchone()
        print(f"📊 Кодировка клиента: {encoding[0]}")
        
        # Получаем задачи
        cursor.execute("""
            SELECT id, title, description, status, created_at 
            FROM tasks 
            ORDER BY created_at DESC
        """)
        
        tasks = cursor.fetchall()
        print(f"📋 Найдено задач: {len(tasks)}")
        
        if not tasks:
            print("📭 Задачи не найдены")
            return
        
        # Создаем файл с UTF-8 BOM для Excel
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f'tasks_export_{timestamp}.csv'
        
        with open(filename, 'w', newline='', encoding='utf-8-sig') as csvfile:
            writer = csv.writer(csvfile, delimiter=';')
            
            # Заголовки
            writer.writerow(['ID', 'Название', 'Описание', 'Статус', 'Дата создания'])
            
            # Маппинг статусов
            status_map = {
                'new': 'Новая',
                'in_progress': 'В процессе',
                'done': 'Выполнена'
            }
            
            for task in tasks:
                writer.writerow([
                    task[0],
                    task[1] or '',
                    task[2] or '',
                    status_map.get(task[3], task[3]),
                    task[4].strftime('%Y-%m-%d %H:%M:%S') if task[4] else ''
                ])
        
        print(f"✅ Экспортировано в: {filename}")
        print(f"📊 Всего задач: {len(tasks)}")
        
        # Показываем первые задачи для проверки
        print("\n📋 Первые задачи:")
        for task in tasks[:3]:
            print(f"   - {task[1]} ({status_map.get(task[3], task[3])})")
        
    except Exception as e:
        print(f"❌ Ошибка: {e}")
        import traceback
        traceback.print_exc()
    finally:
        cursor.close()
        conn.close()
    
    print("=" * 50)
    print("✨ Готово!")

if __name__ == "__main__":
    export_tasks_to_csv()
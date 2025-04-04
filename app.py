
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import sqlite3
import subprocess
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize database
def init_db():
    conn = sqlite3.connect('tasks.db')
    cursor = conn.cursor()
    
    # Create projects table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT
    )
    ''')
    
    # Create tasks table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER,
        title TEXT NOT NULL,
        description TEXT,
        skills TEXT,
        deadline TEXT,
        assigned_to INTEGER DEFAULT NULL,
        FOREIGN KEY (project_id) REFERENCES projects (id)
    )
    ''')
    
    conn.commit()
    conn.close()

# Initialize database at startup
init_db()

# API Routes
@app.route('/api/projects', methods=['GET'])
def get_projects():
    conn = sqlite3.connect('tasks.db')
    cursor = conn.cursor()
    cursor.execute('SELECT id, name, description FROM projects')
    projects_data = cursor.fetchall()
    
    projects = []
    for project in projects_data:
        # Count tasks for each project
        cursor.execute('SELECT COUNT(*) FROM tasks WHERE project_id = ?', (project[0],))
        task_count = cursor.fetchone()[0]
        
        projects.append({
            'id': project[0],
            'name': project[1],
            'description': project[2],
            'tasks': task_count
        })
    
    conn.close()
    return jsonify(projects)

@app.route('/api/projects', methods=['POST'])
def create_project():
    data = request.json
    name = data.get('projectName')
    description = data.get('projectDescription')
    
    conn = sqlite3.connect('tasks.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO projects (name, description) VALUES (?, ?)', 
                   (name, description))
    project_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    return jsonify({'id': project_id, 'name': name, 'description': description})

@app.route('/api/projects/<int:project_id>/tasks', methods=['GET'])
def get_tasks(project_id):
    conn = sqlite3.connect('tasks.db')
    cursor = conn.cursor()
    
    # Get project name
    cursor.execute('SELECT name FROM projects WHERE id = ?', (project_id,))
    project = cursor.fetchone()
    
    if not project:
        conn.close()
        return jsonify({'error': 'Project not found'}), 404
    
    project_name = project[0]
    
    # Get tasks for project
    cursor.execute('SELECT id, title, description, skills, deadline FROM tasks WHERE project_id = ?', 
                   (project_id,))
    tasks_data = cursor.fetchall()
    
    tasks = []
    for task in tasks_data:
        # Parse skills from JSON string
        skills = json.loads(task[3]) if task[3] else []
        
        tasks.append({
            'id': task[0],
            'title': task[1],
            'description': task[2],
            'skills': skills,
            'deadline': task[4]
        })
    
    conn.close()
    
    return jsonify({
        'projectName': project_name,
        'tasks': tasks
    })

@app.route('/api/projects/<int:project_id>/tasks', methods=['POST'])
def create_task(project_id):
    data = request.json
    title = data.get('title')
    description = data.get('description')
    skills = json.dumps(data.get('skills', []))
    deadline = data.get('deadline')
    
    conn = sqlite3.connect('tasks.db')
    cursor = conn.cursor()
    
    # Check if project exists
    cursor.execute('SELECT id FROM projects WHERE id = ?', (project_id,))
    if not cursor.fetchone():
        conn.close()
        return jsonify({'error': 'Project not found'}), 404
    
    # Insert task
    cursor.execute('''
    INSERT INTO tasks (project_id, title, description, skills, deadline)
    VALUES (?, ?, ?, ?, ?)
    ''', (project_id, title, description, skills, deadline))
    
    task_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    # Call TASK_ALLOCATOR.py with task data
    try:
        result = subprocess.run(
            ['python', 'TASK_ALLOCATOR.py'], 
            input=json.dumps({
                'task_id': task_id,
                'title': title,
                'description': description,
                'skills': data.get('skills', []),
                'deadline': deadline
            }).encode(),
            capture_output=True,
            text=True
        )
        
        allocator_response = json.loads(result.stdout) if result.stdout else {}
        
        return jsonify({
            'id': task_id,
            'allocation': allocator_response
        })
        
    except Exception as e:
        # In a real app, handle this error better
        print(f"Error calling TASK_ALLOCATOR.py: {e}")
        return jsonify({
            'id': task_id,
            'allocation': {}
        })

@app.route('/api/tasks/<int:task_id>/assign', methods=['POST'])
def assign_task(task_id):
    data = request.json
    employee_id = data.get('employeeId')
    
    conn = sqlite3.connect('tasks.db')
    cursor = conn.cursor()
    
    # Check if task exists
    cursor.execute('SELECT id FROM tasks WHERE id = ?', (task_id,))
    if not cursor.fetchone():
        conn.close()
        return jsonify({'error': 'Task not found'}), 404
    
    # Assign task
    cursor.execute('UPDATE tasks SET assigned_to = ? WHERE id = ?', (employee_id, task_id))
    conn.commit()
    conn.close()
    
    return jsonify({'success': True})

@app.route('/api/projects/<int:project_id>/prioritize', methods=['GET'])
def prioritize_tasks(project_id):
    # Get all tasks for a project
    conn = sqlite3.connect('tasks.db')
    cursor = conn.cursor()
    
    cursor.execute('''
    SELECT id, title, description, skills, deadline 
    FROM tasks 
    WHERE project_id = ?
    ''', (project_id,))
    
    tasks_data = cursor.fetchall()
    conn.close()
    
    # Format tasks for TASK_PRIORITISER.py
    tasks = []
    for task in tasks_data:
        skills = json.loads(task[3]) if task[3] else []
        tasks.append({
            'id': task[0],
            'title': task[1],
            'description': task[2],
            'skills': skills,
            'deadline': task[4]
        })
    
    # Call TASK_PRIORITISER.py
    try:
        result = subprocess.run(
            ['python', 'TASK_PRIORITISER.py'],
            input=json.dumps({'tasks': tasks}).encode(),
            capture_output=True,
            text=True
        )
        
        prioritized_tasks = json.loads(result.stdout) if result.stdout else []
        
        return jsonify(prioritized_tasks)
        
    except Exception as e:
        print(f"Error calling TASK_PRIORITISER.py: {e}")
        return jsonify(tasks)  # Fall back to unprioritized tasks

if __name__ == '__main__':
    app.run(debug=True, port=5000)

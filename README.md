# Task Nexus: AI Task Manager

An AI-assisted task management system for managers and employees. Managers create projects and tasks, and an NLP-based allocator matches each task's required skills to the best available employees using **semantic similarity** and **shift availability**.

Built with a **React + TypeScript** frontend and a **Flask + SQLite** backend, with a **Sentence-Transformers** model for skill matching.

---

## Features

- **Role-based access**: separate Manager and Employee dashboards
- **Project management**: create projects and view the tasks under each one
- **Task creation**: define a title, description, required skills, and deadline
- **AI skill matching**: free-text skills are mapped to a fixed skillset using `all-MiniLM-L6-v2` embeddings and cosine similarity (threshold 0.6)
- **Availability checking**: tasks are split into daily time windows and checked against each employee's weekly shifts
- **Candidate ranking**: employees with proficiency of at least 5 in a matched skill are ranked by availability, total skill score, and available hours, and the top candidates are returned
- **Task assignment**: managers assign tasks to employees via the API
- **Modern UI**: shadcn/ui components, Tailwind CSS, and responsive layouts

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui (Radix UI), React Router, TanStack Query, React Hook Form, Zod, Recharts |
| Backend | Python, Flask, Flask-CORS, SQLite |
| AI / ML | sentence-transformers (`all-MiniLM-L6-v2`), scikit-learn (cosine similarity) |
| Data | SQL employee dataset (`employee_data.sql`, 1000 employee records) |

---

## Project Structure

```
TASK_MANAGER_AI/
├── app.py                 # Flask REST API (projects, tasks, assignment)
├── TASK_ALLOCATOR.py      # AI skill matching + availability + ranking
├── employee_data.sql      # Employee skills, scores, and weekly shifts
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── public/
└── src/
    ├── App.tsx            # Routes + role-protected routes
    ├── main.tsx
    ├── components/        # Header, ProjectList, TaskList, EmployeeCard, ui/*
    ├── hooks/
    ├── lib/
    └── pages/
        ├── Index.tsx              # Role selection / sign-in
        ├── ManagerDashboard.tsx
        ├── CreateProject.tsx
        ├── ProjectTasks.tsx
        ├── CreateTask.tsx
        ├── TaskAllocation.tsx     # View AI-suggested candidates
        ├── EmployeeDashboard.tsx
        └── NotFound.tsx
```

---

## How It Works

1. A manager creates a **project**, then adds a **task** with required skills and a time window.
2. The backend stores the task in SQLite and passes it to `TASK_ALLOCATOR.py`.
3. The allocator:
   - Encodes each requested skill and finds the closest match in the predefined skillset (e.g. `"welder"` maps to `Welding`).
   - Breaks the task into per-day time windows.
   - Filters employees with a matching skill score of **5 or higher**.
   - Checks each employee's weekly shift against the task windows.
   - Ranks candidates and saves the results as JSON.
4. The manager reviews the suggested candidates and **assigns** the task.

### Supported Skillset

`Welding`, `PLC-Programming`, `Hydraulics`, `Electrical`, `Pneumatics`, `CNC-Operation`, `Machining`, `Fabrication`, `Automation`, `Instrumentation`, `HVAC`, `Blueprint-Reading`, `3D-Printing`, `Quality-Control`, `Robotics`, `Laser-Cutting`, `Carpentry`, `Soldering`, `Networking`, `Motor-Repair`

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or Bun)
- Python 3.9+

### 1. Clone the repository

```bash
git clone https://github.com/gaazilzahid01/TASK_MANAGER_AI.git
cd TASK_MANAGER_AI
```

### 2. Run the frontend

```bash
npm install
npm run dev
```

The app runs at `http://localhost:8080`.

### 3. Run the backend

```bash
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

pip install flask flask-cors sentence-transformers scikit-learn tqdm

python app.py
```

The API runs at `http://localhost:5000`. The SQLite database (`tasks.db`) is created automatically on first run.

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/projects` | List all projects with task counts |
| `POST` | `/api/projects` | Create a project (`projectName`, `projectDescription`) |
| `GET` | `/api/projects/<id>/tasks` | Get a project's tasks |
| `POST` | `/api/projects/<id>/tasks` | Create a task and trigger allocation |
| `POST` | `/api/tasks/<id>/assign` | Assign a task (`employeeId`) |
| `GET` | `/api/projects/<id>/prioritize` | Prioritize a project's tasks (planned) |

---

## Project Status

This project is under active development.

- The backend API and AI allocator are implemented.
- Some frontend pages currently use placeholder data, with the Flask API calls prepared but not yet wired in.
- `TASK_ALLOCATOR.py` expects `tasks.json` and `employees_data.json` in the project root. The employee data is provided as SQL in `employee_data.sql` and needs to be exported to JSON.
- The `/prioritize` endpoint calls `TASK_PRIORITISER.py`, which is not yet included.
- Authentication is a simple role selector, not a full login system.

## Roadmap

- [ ] Connect all frontend pages to the Flask API
- [ ] Load employees directly from SQLite instead of JSON
- [ ] Add the task prioritiser module
- [ ] Real authentication (JWT / sessions)
- [ ] Notifications for assigned tasks
- [ ] Dashboard analytics (workload, deadlines)

---

## Contributing

Contributions are welcome. Fork the repo, create a feature branch, and open a pull request.

## License

This project is licensed under the MIT License. Add a `LICENSE` file to the repo to match.

## Author

**Gaazil Zahid**: [@gaazilzahid01](https://github.com/gaazilzahid01)

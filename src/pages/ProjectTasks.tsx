
import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import Header from '@/components/Header';
import TaskList from '@/components/TaskList';

// Mock data - would come from Flask/Backend
const mockTasks = [
  { 
    id: 1, 
    title: 'Design Homepage', 
    description: 'Create mockups for the new homepage', 
    skills: ['UI/UX', 'Figma'], 
    deadline: '2025-04-20' 
  },
  { 
    id: 2, 
    title: 'Setup Database', 
    description: 'Configure and initialize the SQL database', 
    skills: ['SQL', 'Database Design'], 
    deadline: '2025-04-15' 
  },
  { 
    id: 3, 
    title: 'Implement User Authentication', 
    description: 'Create login and registration functionality', 
    skills: ['Security', 'Flask', 'Python'], 
    deadline: '2025-04-25' 
  }
];

const ProjectTasks = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [tasks, setTasks] = useState(mockTasks);
  const [projectName, setProjectName] = useState('');
  const [redirect, setRedirect] = useState<string | null>(null);
  
  useEffect(() => {
    // Here we would fetch project details and tasks from Flask backend
    // For now, we're using mock data
    console.log(`Fetching tasks for project ID: ${projectId}`);
    
    // Mock loading project name
    setProjectName(`Project #${projectId}`);
    
    // In real implementation, we would call your Flask backend
    // const fetchTasks = async () => {
    //   const response = await fetch(`/api/projects/${projectId}/tasks`);
    //   const data = await response.json();
    //   setTasks(data.tasks);
    //   setProjectName(data.projectName);
    // };
    // fetchTasks();
  }, [projectId]);

  const handleCreateTask = () => {
    setRedirect(`/manager/project/${projectId}/create-task`);
  };

  const handleTaskClick = (taskId: number) => {
    setRedirect(`/manager/project/${projectId}/task/${taskId}`);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <Header title={`${projectName} - Tasks`} />
      <main className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
          <Button 
            onClick={handleCreateTask}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Task
          </Button>
        </div>
        
        <Card className="shadow-md border-blue-100">
          <CardHeader>
            <CardTitle className="text-xl text-blue-700">Task List</CardTitle>
            <CardDescription>Manage project tasks and assignments</CardDescription>
          </CardHeader>
          <CardContent>
            {tasks.length > 0 ? (
              <TaskList tasks={tasks} onTaskClick={handleTaskClick} />
            ) : (
              <div className="text-center p-8 text-gray-500">
                No tasks found for this project. Create a new task to get started.
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProjectTasks;

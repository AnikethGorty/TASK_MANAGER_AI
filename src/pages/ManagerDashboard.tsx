
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import ProjectList from '@/components/ProjectList';
import Header from '@/components/Header';

// Mock data - would come from API/Flask in real implementation
const mockProjects = [
  { id: 1, name: 'Website Redesign', description: 'Redesign the company website', tasks: 5 },
  { id: 2, name: 'Mobile App Development', description: 'Create a new mobile application', tasks: 8 },
  { id: 3, name: 'Database Migration', description: 'Migrate data to new database system', tasks: 3 },
];

const ManagerDashboard = () => {
  const [projects, setProjects] = useState(mockProjects);
  const [redirect, setRedirect] = useState<string | null>(null);
  
  useEffect(() => {
    // Here we would fetch projects from Flask backend
    // For now, we're using mock data
    console.log('Fetching projects from backend...');
  }, []);

  const handleCreateProject = () => {
    setRedirect('/manager/create-project');
  };

  const handleProjectClick = (projectId: number) => {
    setRedirect(`/manager/project/${projectId}`);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <Header title="Manager Dashboard" />
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 shadow-md border-blue-100">
            <CardHeader>
              <CardTitle className="text-xl text-blue-700 flex items-center justify-between">
                Your Projects
                <Button 
                  onClick={handleCreateProject}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Project
                </Button>
              </CardTitle>
              <CardDescription>
                Manage and track your team's projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectList projects={projects} onProjectClick={handleProjectClick} />
            </CardContent>
          </Card>

          <Card className="shadow-md border-blue-100">
            <CardHeader>
              <CardTitle className="text-xl text-blue-700">Quick Stats</CardTitle>
              <CardDescription>Overview of your team's progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="text-sm text-gray-500">Total Projects</div>
                <div className="text-2xl font-bold text-blue-700">{projects.length}</div>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="text-sm text-gray-500">Tasks In Progress</div>
                <div className="text-2xl font-bold text-green-600">
                  {projects.reduce((sum, project) => sum + project.tasks, 0)}
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="text-sm text-gray-500">Upcoming Deadlines</div>
                <div className="text-2xl font-bold text-red-500">3</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ManagerDashboard;

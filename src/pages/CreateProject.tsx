
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import Header from '@/components/Header';

const CreateProject = () => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [redirect, setRedirect] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectName.trim()) {
      toast.error('Project name is required');
      return;
    }

    setIsSubmitting(true);

    // Here we would send data to Flask backend
    try {
      // Mock API call to Flask backend
      console.log('Sending project data to backend:', { projectName, projectDescription });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success scenario
      toast.success('Project created successfully!');
      
      // Generate a mock project ID (in real app, this would come from the backend)
      const newProjectId = Math.floor(Math.random() * 1000);
      
      // Redirect to the new project page
      setTimeout(() => {
        setRedirect(`/manager/project/${newProjectId}`);
      }, 500);
      
    } catch (error) {
      toast.error('Failed to create project. Please try again.');
      console.error('Error creating project:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <Header title="Create Project" />
      <main className="container mx-auto p-4">
        <Card className="max-w-2xl mx-auto shadow-md border-blue-100">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-xl text-blue-700">Create New Project</CardTitle>
              <CardDescription>Fill out the details below to create a new project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="project-name" className="text-sm font-medium text-gray-700">
                  Project Name
                </label>
                <Input
                  id="project-name"
                  placeholder="Enter project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="project-description" className="text-sm font-medium text-gray-700">
                  Describe your project
                </label>
                <Textarea
                  id="project-description"
                  placeholder="Enter project description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="w-full min-h-[150px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setRedirect('/manager/dashboard')}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Project'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default CreateProject;

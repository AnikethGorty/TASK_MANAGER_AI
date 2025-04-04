
import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import Header from '@/components/Header';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

const CreateTask = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirect, setRedirect] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Task title is required');
      return;
    }

    if (!deadline) {
      toast.error('Deadline is required');
      return;
    }

    setIsSubmitting(true);

    // Prepare data to send to Flask backend
    const taskData = {
      title,
      description,
      skills: skills.split(',').map(skill => skill.trim()),
      deadline: deadline ? format(deadline, 'yyyy-MM-dd') : '',
      projectId
    };

    // Here we would send data to Flask backend
    try {
      // Mock API call to Flask backend
      console.log('Sending task data to backend:', taskData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate activating TASK_ALLOCATOR.py
      console.log('Activating TASK_ALLOCATOR.py with task data');
      
      // Success scenario
      toast.success('Task created successfully!');
      
      // Generate a mock task ID (in real app, this would come from the backend)
      const newTaskId = Math.floor(Math.random() * 1000);
      
      // Redirect to the task allocation page
      setTimeout(() => {
        setRedirect(`/manager/project/${projectId}/task/${newTaskId}/allocation`);
      }, 500);
      
    } catch (error) {
      toast.error('Failed to create task. Please try again.');
      console.error('Error creating task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <Header title="Create Task" />
      <main className="container mx-auto p-4">
        <Card className="max-w-2xl mx-auto shadow-md border-blue-100">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-xl text-blue-700">Create New Task</CardTitle>
              <CardDescription>Fill out the task details below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="task-title" className="text-sm font-medium text-gray-700">
                  Task Title
                </label>
                <Input
                  id="task-title"
                  placeholder="Enter task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="task-description" className="text-sm font-medium text-gray-700">
                  Describe the task
                </label>
                <Textarea
                  id="task-description"
                  placeholder="Enter task description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full min-h-[100px]"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="skills-needed" className="text-sm font-medium text-gray-700">
                  Skills needed
                </label>
                <Input
                  id="skills-needed"
                  placeholder="Enter skills, separated by commas"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">Example: Python, SQL, UI Design</p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="deadline" className="text-sm font-medium text-gray-700">
                  Deadline
                </label>
                <div className="relative">
                  <Input
                    id="deadline"
                    placeholder="Select a deadline"
                    value={deadline ? format(deadline, 'PPP') : ''}
                    onClick={() => setShowCalendar(!showCalendar)}
                    readOnly
                    className="w-full cursor-pointer"
                  />
                  {showCalendar && (
                    <div className="absolute z-10 mt-1 bg-white shadow-lg rounded-md border border-gray-200">
                      <Calendar
                        mode="single"
                        selected={deadline}
                        onSelect={(date) => {
                          setDeadline(date);
                          setShowCalendar(false);
                        }}
                        className="p-3 pointer-events-auto"
                        initialFocus
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setRedirect(`/manager/project/${projectId}`)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Add Task'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default CreateTask;


import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import TaskList from '@/components/TaskList';
import { Navigate } from 'react-router-dom';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

// Mock data for employee tasks
const mockEmployeeTasks = [
  { 
    id: 1, 
    title: 'Finish Frontend Design', 
    description: 'Complete the UI design for the dashboard', 
    skills: ['UI/UX', 'React'], 
    deadline: '2025-04-15' 
  },
  { 
    id: 2, 
    title: 'Setup API Integration', 
    description: 'Connect frontend to the Flask backend', 
    skills: ['API', 'JavaScript'], 
    deadline: '2025-04-20' 
  },
  { 
    id: 3, 
    title: 'Test Authentication Flow', 
    description: 'Verify that the login system works correctly', 
    skills: ['Testing', 'Security'], 
    deadline: '2025-04-18' 
  }
];

const EmployeeDashboard = () => {
  const [assignedTasks, setAssignedTasks] = useState(mockEmployeeTasks);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [redirect, setRedirect] = useState<string | null>(null);

  useEffect(() => {
    // Here you would fetch the assigned tasks for this employee from your backend
    // For now we're using mock data
    console.log("Fetching assigned tasks for employee");
  }, []);

  const handleTaskClick = (taskId: number) => {
    // Navigate to task detail view
    setRedirect(`/employee/task/${taskId}`);
  };

  const handlePreviousTask = () => {
    if (assignedTasks.length === 0) return;
    
    const newIndex = currentTaskIndex > 0 ? currentTaskIndex - 1 : assignedTasks.length - 1;
    setCurrentTaskIndex(newIndex);
  };

  const handleNextTask = () => {
    if (assignedTasks.length === 0) return;
    
    const newIndex = currentTaskIndex < assignedTasks.length - 1 ? currentTaskIndex + 1 : 0;
    setCurrentTaskIndex(newIndex);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <Header title="Employee Dashboard" />
      <main className="container mx-auto p-4">
        <Card className="shadow-md border-blue-100 mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-blue-700">Your Assigned Tasks</CardTitle>
            <CardDescription>Tasks that have been assigned to you</CardDescription>
          </CardHeader>
          <CardContent>
            {assignedTasks.length > 0 ? (
              <>
                <TaskList tasks={assignedTasks} onTaskClick={handleTaskClick} />
                <Pagination className="mt-6">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={handlePreviousTask} 
                        className="cursor-pointer"
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext 
                        onClick={handleNextTask} 
                        className="cursor-pointer"
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </>
            ) : (
              <div className="text-center p-8 text-gray-500">
                No tasks assigned to you yet.
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EmployeeDashboard;

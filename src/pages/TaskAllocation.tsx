
import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { toast } from 'sonner';
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import EmployeeCard from '@/components/EmployeeCard';

// Mock data that would be returned from TASK_ALLOCATOR.py
const mockTaskAllocationData = {
  taskName: "Design Homepage",
  skillsFound: ["UI/UX", "Figma", "Web Design"],
  aiSuggestedSkills: ["Adobe XD", "Sketch", "Prototyping"],
  matchingEmployees: [
    { 
      id: 1,
      name: "Alex Johnson", 
      skills: ["UI/UX", "Figma", "Adobe XD"], 
      shift: "Morning", 
      workFrom: "9:00", 
      workTo: "17:00" 
    },
    { 
      id: 2,
      name: "Sam Taylor", 
      skills: ["Web Design", "Figma", "Sketch"], 
      shift: "Afternoon", 
      workFrom: "12:00", 
      workTo: "20:00" 
    },
    { 
      id: 3,
      name: "Jamie Smith", 
      skills: ["UI/UX", "Prototyping", "User Research"], 
      shift: "Morning", 
      workFrom: "8:00", 
      workTo: "16:00" 
    }
  ]
};

// Mock tasks data
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

const TaskAllocation = () => {
  const { projectId, taskId } = useParams<{ projectId: string, taskId: string }>();
  const [allocationData, setAllocationData] = useState(mockTaskAllocationData);
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [redirect, setRedirect] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState(mockTasks);
  
  useEffect(() => {
    // Here we would fetch data from TASK_ALLOCATOR.py via Flask backend
    // For now, we're using mock data
    console.log(`Fetching allocation data for task ID: ${taskId} in project ID: ${projectId}`);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [projectId, taskId]);

  const handleAssignTask = async () => {
    if (selectedEmployee === null) {
      toast.error('Please select an employee to assign the task');
      return;
    }
    
    try {
      // Mock API call to assign task to employee
      console.log(`Assigning task ${taskId} to employee ${selectedEmployee}`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success scenario
      toast.success('Task assigned successfully!');
      
      // Redirect back to project tasks
      setTimeout(() => {
        setRedirect(`/manager/project/${projectId}`);
      }, 1000);
      
    } catch (error) {
      toast.error('Failed to assign task. Please try again.');
      console.error('Error assigning task:', error);
    }
  };

  const handlePreviousTask = () => {
    if (tasks.length === 0) return;
    
    const currentTaskIdNum = parseInt(taskId || '0', 10);
    const currentTaskIndex = tasks.findIndex(task => task.id === currentTaskIdNum);
    if (currentTaskIndex === -1) return;
    
    const newIndex = currentTaskIndex > 0 ? currentTaskIndex - 1 : tasks.length - 1;
    setRedirect(`/manager/project/${projectId}/task/${tasks[newIndex].id}/allocation`);
  };

  const handleNextTask = () => {
    if (tasks.length === 0) return;
    
    const currentTaskIdNum = parseInt(taskId || '0', 10);
    const currentTaskIndex = tasks.findIndex(task => task.id === currentTaskIdNum);
    if (currentTaskIndex === -1) return;
    
    const newIndex = currentTaskIndex < tasks.length - 1 ? currentTaskIndex + 1 : 0;
    setRedirect(`/manager/project/${projectId}/task/${tasks[newIndex].id}/allocation`);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-blue-50">
        <Header title="Task Allocation" />
        <main className="container mx-auto p-4 text-center">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg text-gray-700">Analyzing task and finding matching employees...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <Header title="Task Allocation" />
      <main className="container mx-auto p-4">
        {/* Navigation controls */}
        <div className="flex justify-between items-center mb-4">
          <Button 
            variant="outline" 
            onClick={handlePreviousTask}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous Task
          </Button>
          <Button 
            variant="outline" 
            onClick={handleNextTask}
            className="flex items-center gap-2"
          >
            Next Task
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <Card className="shadow-md border-blue-100 mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-blue-700">Task: {allocationData.taskName}</CardTitle>
            <CardDescription>AI-powered employee matching results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Skills Found</h3>
              <div className="flex flex-wrap gap-2">
                {allocationData.skillsFound.map((skill, index) => (
                  <Badge key={index} variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">AI Suggested Skills</h3>
              <div className="flex flex-wrap gap-2">
                {allocationData.aiSuggestedSkills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="border-green-400 text-green-800 hover:bg-green-50">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md border-blue-100">
          <CardHeader>
            <CardTitle className="text-xl text-blue-700">Matching Employees</CardTitle>
            <CardDescription>Select an employee to assign this task</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allocationData.matchingEmployees.map((employee) => (
                <EmployeeCard
                  key={employee.id}
                  employee={employee}
                  isSelected={selectedEmployee === employee.id}
                  onSelect={() => setSelectedEmployee(employee.id)}
                />
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              onClick={handleAssignTask} 
              className="bg-green-600 hover:bg-green-700"
              disabled={selectedEmployee === null}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Assign Task
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default TaskAllocation;

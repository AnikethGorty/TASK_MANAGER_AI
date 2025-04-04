
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ManagerDashboard from "./pages/ManagerDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import CreateProject from "./pages/CreateProject";
import ProjectTasks from "./pages/ProjectTasks";
import CreateTask from "./pages/CreateTask";
import TaskAllocation from "./pages/TaskAllocation";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children, requiredRole }: { children: JSX.Element, requiredRole: string }) => {
  const userRole = localStorage.getItem('userRole');
  
  if (!userRole) {
    return <Navigate to="/" replace />;
  }
  
  if (requiredRole && userRole !== requiredRole) {
    return userRole === 'manager' 
      ? <Navigate to="/manager/dashboard" replace /> 
      : <Navigate to="/employee/dashboard" replace />;
  }
  
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Manager routes */}
          <Route 
            path="/manager/dashboard" 
            element={
              <ProtectedRoute requiredRole="manager">
                <ManagerDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/manager/create-project" 
            element={
              <ProtectedRoute requiredRole="manager">
                <CreateProject />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/manager/project/:projectId" 
            element={
              <ProtectedRoute requiredRole="manager">
                <ProjectTasks />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/manager/project/:projectId/create-task" 
            element={
              <ProtectedRoute requiredRole="manager">
                <CreateTask />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/manager/project/:projectId/task/:taskId/allocation" 
            element={
              <ProtectedRoute requiredRole="manager">
                <TaskAllocation />
              </ProtectedRoute>
            } 
          />

          {/* Employee routes */}
          <Route 
            path="/employee/dashboard" 
            element={
              <ProtectedRoute requiredRole="employee">
                <EmployeeDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

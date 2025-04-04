
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const [redirect, setRedirect] = React.useState<string | null>(null);

  const handleLogin = (role: 'manager' | 'employee') => {
    localStorage.setItem('userRole', role);
    setRedirect(role === 'manager' ? '/manager/dashboard' : '/employee/dashboard');
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg border-blue-200">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-blue-700">Task Nexus</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Task Management System
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-gray-700 mb-6">
              Please sign in to continue
            </div>
            <div className="space-y-3">
              <Button
                onClick={() => handleLogin('manager')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg"
              >
                Sign in as Manager
              </Button>
              <Button
                onClick={() => handleLogin('employee')}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-4 text-lg"
              >
                Sign in as Employee
              </Button>
            </div>
          </CardContent>
          <CardFooter className="text-center text-sm text-gray-500">
            © 2025 Task Nexus - All rights reserved
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;

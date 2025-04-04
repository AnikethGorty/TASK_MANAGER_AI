
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';

const EmployeeDashboard = () => {
  return (
    <div className="min-h-screen bg-blue-50">
      <Header title="Employee Dashboard" />
      <main className="container mx-auto p-4">
        <Card className="shadow-md border-blue-100 mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-blue-700">Filler Page</CardTitle>
            <CardDescription>This is a placeholder for the Employee Dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              This page is currently under development. In the future, employees will be able to view and manage their assigned tasks here.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EmployeeDashboard;

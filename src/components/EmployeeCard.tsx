
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Employee {
  id: number;
  name: string;
  skills: string[];
  shift: string;
  workFrom: string;
  workTo: string;
}

interface EmployeeCardProps {
  employee: Employee;
  isSelected: boolean;
  onSelect: () => void;
}

const EmployeeCard = ({ employee, isSelected, onSelect }: EmployeeCardProps) => {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md",
        isSelected 
          ? "border-2 border-green-500 shadow-md" 
          : "border border-gray-200"
      )}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">{employee.name}</h3>
          {isSelected && (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
              Selected
            </Badge>
          )}
        </div>
        
        <div className="mt-3 flex flex-wrap gap-2">
          {employee.skills.map((skill, index) => (
            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {skill}
            </Badge>
          ))}
        </div>
        
        <div className="mt-3 text-sm text-gray-600">
          <div className="mb-1">Shift: {employee.shift}</div>
          <div>Working hours: {employee.workFrom} to {employee.workTo}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;

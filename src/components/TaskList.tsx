
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { format, parseISO, isValid } from 'date-fns';

interface Task {
  id: number;
  title: string;
  description: string;
  skills: string[];
  deadline: string;
}

interface TaskListProps {
  tasks: Task[];
  onTaskClick: (id: number) => void;
}

const TaskList = ({ tasks, onTaskClick }: TaskListProps) => {
  const formatDeadline = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return isValid(date) ? format(date, 'MMM d, yyyy') : dateString;
    } catch {
      return dateString;
    }
  };

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <Card 
          key={task.id}
          className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-green-500"
          onClick={() => onTaskClick(task.id)}
        >
          <CardContent className="p-4">
            <div>
              <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{task.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {task.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100">
                    {skill}
                  </Badge>
                ))}
              </div>
              <div className="flex text-xs text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Deadline: {formatDeadline(task.deadline)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;

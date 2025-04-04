
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  description: string;
  tasks: number;
}

interface ProjectListProps {
  projects: Project[];
  onProjectClick: (id: number) => void;
}

const ProjectList = ({ projects, onProjectClick }: ProjectListProps) => {
  return (
    <div className="grid gap-4">
      {projects.length > 0 ? (
        projects.map((project) => (
          <Card 
            key={project.id}
            className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-blue-500"
            onClick={() => onProjectClick(project.id)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{project.name}</h3>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                  {project.tasks} {project.tasks === 1 ? 'Task' : 'Tasks'}
                </div>
              </div>
              <div className="flex mt-3 text-xs text-gray-500">
                <div className="flex items-center mr-4">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Created: Today</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Status: Active</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center p-8 text-gray-500">
          No projects found. Create a new project to get started.
        </div>
      )}
    </div>
  );
};

export default ProjectList;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-700">Task Nexus</h1>
          <p className="text-sm text-gray-600">{title}</p>
        </div>
        <Button 
          onClick={handleLogout} 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;

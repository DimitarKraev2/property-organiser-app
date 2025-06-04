import React from 'react';
import { NavLink } from 'react-router-dom';
import { Building2, PlusCircle } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-dark-200 border-r border-dark-300">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Building2 className="h-8 w-8 text-accent-400" />
          <span className="text-2xl font-bold">PropertyPro</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          <NavItem 
            icon={<Building2 />} 
            to="/" 
            label="Properties" 
          />
          <NavItem 
            icon={<PlusCircle />} 
            to="/add" 
            label="Add Property" 
          />
        </ul>
      </nav>
      
      <div className="p-4 border-t border-dark-300">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>© 2025 PropertyPro</span>
        </div>
      </div>
    </aside>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  to: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, to, label }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive
              ? 'bg-dark-300 text-white'
              : 'text-gray-400 hover:bg-dark-300 hover:text-white'
          }`
        }
      >
        <span className="text-accent-400">{icon}</span>
        <span>{label}</span>
      </NavLink>
    </li>
  );
};

export default Sidebar;
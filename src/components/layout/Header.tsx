import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, PlusCircle, Menu } from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const { searchProperties } = useProperties();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    searchProperties(value);
  };

  return (
    <header className="bg-dark-200 border-b border-dark-300 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
          
          <h1 className="text-xl font-semibold">Properties</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchValue}
              onChange={handleSearch}
              className="bg-dark-300 border border-dark-400 rounded-full py-2 pl-10 pr-4 w-64 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
          
          <Link 
            to="/add" 
            className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-2 transition-colors"
          >
            <PlusCircle size={20} />
          </Link>
          
          <button className="relative text-gray-400 hover:text-white transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">3</span>
          </button>
          
          <div className="h-8 w-8 rounded-full bg-accent-400 overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg" 
              alt="User profile" 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="mt-4 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchValue}
              onChange={handleSearch}
              className="bg-dark-300 border border-dark-400 rounded-full py-2 pl-10 pr-4 w-full text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
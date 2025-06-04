import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { supabase } from '../../utils/supabaseClient';

const Layout: React.FC = () => {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user?.email) {
        setUserEmail(data.user.email);
      }
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="flex h-screen bg-dark-100 text-white overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 relative">
          <Outlet />
          {userEmail && (
            <div className="absolute bottom-4 right-6 bg-gray-800 px-4 py-2 rounded shadow-md text-sm flex gap-4 items-center">
              <span>{userEmail}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white"
              >
                Logout
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Layout;

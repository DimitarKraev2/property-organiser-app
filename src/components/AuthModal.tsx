import { useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function AuthModal() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogin = async () => {
      const { data, error } = await supabase.auth.exchangeCodeForSession();
      if (error) {
        console.error('Login exchange error:', error.message);
      } else {
        navigate('/');
      }
    };

    handleLogin();
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center text-white z-50">
      <div className="bg-gray-900 p-6 rounded shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">Redirecting to Google login...</h2>
        <p>Please wait while we log you in.</p>
      </div>
    </div>
  );
}

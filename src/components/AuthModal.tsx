import { useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function AuthModal() {
  useEffect(() => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center text-white z-50">
      <div className="bg-gray-900 p-6 rounded shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">Redirecting to Google login...</h2>
        <p>Please wait while we log you in.</p>
      </div>
    </div>
  );
}

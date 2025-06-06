import { useEffect, useState } from 'react';
import { supabase } from './utils/supabaseClient';
import PropertyManager from './components/PropertyManager';
import AuthModal from './components/AuthModal';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      // Step 1: Handle OAuth redirect (if there is one)
      if (window.location.hash.includes('access_token') || window.location.search.includes('code=')) {
        try {
          const { data, error } = await supabase.auth.exchangeCodeForSession();
          if (error) {
            console.error('OAuth error:', error);
          } else {
            console.log('OAuth session established:', data);
          }
        } catch (err) {
          console.error('Exchange session error:', err);
        }
      }

      // Step 2: Check existing session
      const { data: { session } } = await supabase.auth.getSession();
      setLoggedIn(!!session);
      setSessionChecked(true);

      // Step 3: Listen for future login/logout changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setLoggedIn(!!session);
      });

      return () => subscription.unsubscribe();
    };

    checkSession();
  }, []);

  if (!sessionChecked) return <AuthModal />;
  return <PropertyManager />;
}

export default App;

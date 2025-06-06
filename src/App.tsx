import { useEffect, useState } from 'react';
import { supabase } from './utils/supabaseClient';
import PropertyManager from './components/PropertyManager';
import AuthModal from './components/AuthModal';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [session, setSession] = useState(null);
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      if (window.location.hash.includes('access_token') || window.location.search.includes('code=')) {
        try {
          const { data, error } = await supabase.auth.exchangeCodeForSession();
          if (error) console.error('OAuth error:', error);
          else setSession(data.session);
        } catch (err) {
          console.error('Exchange session error:', err);
        }
      }

      const { data: { session } } = await supabase.auth.getSession();
      setLoggedIn(!!session);
      setSession(session);
      setSessionChecked(true);

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setLoggedIn(!!session);
        setSession(session);
      });

      return () => subscription.unsubscribe();
    };

    checkSession();
  }, []);

  if (!sessionChecked) return <AuthModal />;
  return <PropertyManager session={session} />;
}

export default App;

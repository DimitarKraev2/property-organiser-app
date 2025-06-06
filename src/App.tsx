import { useEffect, useState } from 'react';
import { supabase } from './utils/supabaseClient';
import PropertyManager from './components/PropertyManager';
import AuthModal from './components/AuthModal';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      // Only run this once on initial OAuth redirect
      try {
        const { data, error } = await supabase.auth.exchangeCodeForSession();
        if (error) console.error('OAuth error:', error);
        else console.log('OAuth success, session:', data);
      } catch (err) {
        console.error('OAuth exchange error:', err);
      }
    };

    handleOAuthRedirect().finally(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setLoggedIn(!!session);
        setSessionChecked(true);
      });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session);
      setSessionChecked(true);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!sessionChecked) return <AuthModal />;

  return <PropertyManager />;
}

export default App;

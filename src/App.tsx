import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AddProperty from './pages/AddProperty';
import Home from './pages/Home';
import { PropertyProvider } from './context/PropertyContext';
import { supabase } from './utils/supabaseClient';
import AuthModal from './components/AuthModal';

function App() {
  const [sessionChecked, setSessionChecked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const hash = window.location.hash;
        const hasAuthCode = hash.includes('access_token') || hash.includes('code');

        // Step 1: Handle redirect after login only if needed
        if (hasAuthCode) {
          const { error } = await supabase.auth.exchangeCodeForSession();
          if (error) {
            console.error('OAuth exchange error:', error);
          }
        }

        // Step 2: Get current session
        const { data: { session } } = await supabase.auth.getSession();
        setLoggedIn(!!session);
        setSessionChecked(true);

        // Step 3: Listen for auth state changes
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
          setLoggedIn(!!session);
        });

        return () => listener.subscription.unsubscribe();
      } catch (err) {
        console.error('Unexpected error in auth flow:', err);
        setSessionChecked(true); // still allow app to load
      }
    };

    handleAuth();
  }, []);

  if (!sessionChecked) return null;
  if (!loggedIn) return <AuthModal />;

  return (
    <PropertyProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="add" element={<AddProperty />} />
          </Route>
        </Routes>
      </Router>
    </PropertyProvider>
  );
}

export default App;

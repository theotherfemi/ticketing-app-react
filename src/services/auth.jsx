import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from './supabase';

const SESSION_KEY = 'ticketapp_session';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!mounted) return;
        if (data?.session) {
          setSession(data.session);
          try { localStorage.setItem(SESSION_KEY, JSON.stringify(data.session)); } catch {}
        } else {
          setSession(null);
          try { localStorage.removeItem(SESSION_KEY); } catch {}
        }
      } catch (err) {
        console.error('auth init error', err);
        setSession(null);
      } finally {
        if (mounted) {
          setLoading(false);
          setInitializing(false);
        }
      }
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      try {
        if (newSession) localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
        else localStorage.removeItem(SESSION_KEY);
      } catch {}
    });

    return () => {
      mounted = false;
      try { listener.subscription.unsubscribe(); } catch {}
    };
  }, []);

  const login = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    if (data?.session) {
      setSession(data.session);
      try { localStorage.setItem(SESSION_KEY, JSON.stringify(data.session)); } catch {}
    }
    return data;
  }, []);

  const signup = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    if (data?.session) {
      setSession(data.session);
      try { localStorage.setItem(SESSION_KEY, JSON.stringify(data.session)); } catch {}
    }
    return data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('signOut error', err);
    } finally {
      setSession(null);
      try { localStorage.removeItem(SESSION_KEY); } catch {}
    }
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading, initializing, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

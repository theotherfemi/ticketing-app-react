// src/services/auth.js
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check session immediately on mount
    const loadSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        setSession(data.session);
        localStorage.setItem("ticketpro_session", JSON.stringify(data.session));
      } else {
        localStorage.removeItem("ticketpro_session");
      }
      setLoading(false);
    };
    loadSession();

    // Subscribe to auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession) {
        localStorage.setItem("ticketpro_session", JSON.stringify(newSession));
      } else {
        localStorage.removeItem("ticketpro_session");
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    if (data?.session) {
      setSession(data.session);
      localStorage.setItem("ticketpro_session", JSON.stringify(data.session));
    }
    return data;
  };

  const signup = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    if (data?.session) {
      setSession(data.session);
      localStorage.setItem("ticketpro_session", JSON.stringify(data.session));
    }
    return data;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    localStorage.removeItem("ticketpro_session");
  };

  return (
    <AuthContext.Provider value={{ session, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

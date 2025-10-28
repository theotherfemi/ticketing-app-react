// src/routes/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../services/auth';

export default function ProtectedRoute({ children, redirectTo = '/auth/login' }) {
  const { session, loading, initializing } = useAuth();
  const location = useLocation();

  // While we are restoring auth state, don't redirect — show a small loader
  if (loading || initializing) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="text-gray-600 animate-pulse">Checking authentication…</div>
      </div>
    );
  }

  // If no session at this point, force redirect to login
  if (!session) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Authenticated — render child routes
  return children;
}

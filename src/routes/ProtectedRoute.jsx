import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../services/auth';

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600 animate-pulse">
        Checking authentication...
      </div>
    );
  }

  if (!session) {
    return (
      <Navigate to="/auth/login" state={{ from: location }} replace />
    );
  }

  return children;
}

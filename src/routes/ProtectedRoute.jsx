// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../services/auth";

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
}

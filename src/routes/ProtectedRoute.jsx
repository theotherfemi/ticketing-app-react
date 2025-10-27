import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../services/auth'


export default function ProtectedRoute({ children }){
    const { session, loading } = useAuth();

    const location = useLocation()

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    if(!session) return <Navigate to="/auth/login" state={{ from: location }} replace />
    return children
}

// src/components/ProtectedRoute.jsx
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../services/auth";

// export default function ProtectedRoute({ children }) {
//   const { session, loading } = useAuth();

//   if (loading) return <div className="text-center mt-10">Loading...</div>;

//   if (!session) return <Navigate to="/auth/login" replace />;
//   return children;
// }

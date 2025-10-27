import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../services/auth'


export default function ProtectedRoute({ children }){
    const { session } = useAuth()
    const location = useLocation()
    if(!session) return <Navigate to="/auth/login" state={{ from: location }} replace />
    return children
}


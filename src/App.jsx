import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Dashboard from './pages/Dashboard'
import Tickets from './pages/Tickets'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './routes/ProtectedRoute'
import { useAuth } from './services/auth'
import Toast from './components/Toast'


export default function App(){
const { session } = useAuth()
return (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1 container-max px-4 sm:px-6 lg:px-8 mx-auto">
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/auth/login" element={<Login/>} />
      <Route path="/auth/signup" element={<Signup/>} />


      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      <Route path="/tickets" element={<ProtectedRoute><Tickets/></ProtectedRoute>} />


      <Route path="*" element={<Navigate to={session?'/dashboard':'/'} replace />} />
    </Routes>
    </main>
    <Footer />
    <Toast />
  </div>
)
}
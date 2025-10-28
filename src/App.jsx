// src/App.jsx (example)
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard';
import Tickets from './pages/Tickets';
import ProtectedRoute from './routes/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className='grow max-w-[1440px] w-full mx-auto px-4'>
      <Header />
      <main className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tickets"
            element={
              <ProtectedRoute>
                <Tickets />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

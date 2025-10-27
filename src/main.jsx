import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { AuthProvider } from './services/auth'
import { TicketsProvider } from './services/ticketService'


createRoot(document.getElementById('root')).render(
<React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <TicketsProvider>
        <App />
      </TicketsProvider>
    </AuthProvider>
  </BrowserRouter>
</React.StrictMode>
)
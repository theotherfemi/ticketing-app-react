import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const { session, logout } = useAuth();
  const nav = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const doLogout = () => {
    logout();
    nav('/');
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-[1440px] w-full mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          TicketPro
        </Link>

        {/* Hamburger for mobile */}
        <button
          onClick={toggleMenu}
          className="sm:hidden text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Navigation Links */}
        <nav
          className={`${
            menuOpen ? 'block' : 'hidden'
          } absolute sm:static top-full left-0 w-full sm:w-auto bg-white sm:bg-transparent border-t sm:border-none sm:flex items-center gap-4 sm:gap-6 p-4 sm:p-0 transition-all`}
        >
          <Link
            to="/"
            className="block py-2 text-gray-700 hover:text-blue-600"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          {session ? (
            <>
              <Link
                to="/dashboard"
                className="block py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/tickets"
                className="block py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setMenuOpen(false)}
              >
                Tickets
              </Link>
              <button
                onClick={() => {
                  doLogout();
                  setMenuOpen(false);
                }}
                className="block w-full sm:w-auto text-left px-3 py-2 rounded-md bg-red-50 hover:bg-red-100 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="block py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/auth/signup"
                className="block w-full sm:w-auto text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={() => setMenuOpen(false)}
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

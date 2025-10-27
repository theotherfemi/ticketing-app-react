// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { supabase } from '../../services/supabase';

// export default function Login() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     if (!formData.email || !formData.password) {
//       setError('Please fill in all fields.');
//       return;
//     }

//     setLoading(true);
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email: formData.email,
//       password: formData.password,
//     });
//     setLoading(false);

//     if (error) {
//       setError(error.message);
//       return;
//     }

//     navigate('/dashboard');
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center px-2 sm:w-[600px] w-full">
//       <div className="bg-white shadow-lg rounded-2xl p-8 w-full">
//         <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Welcome Back</h2>
//         <p className="text-center text-gray-500 mb-8">Log in to your TicketPro account</p>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-gray-700 mb-1">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//               className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 mb-1">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>
//           {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
//         <p className="text-center text-gray-500 mt-6">
//           Don’t have an account?{' '}
//           <Link to="/auth/signup" className="text-blue-600 hover:underline">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../services/auth';

export default function Login() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Automatically redirect if already logged in
  useEffect(() => {
    if (session) navigate('/dashboard');
  }, [session, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // ✅ Explicitly store session in localStorage for persistence
    if (data.session) {
      localStorage.setItem('ticketpro_session', JSON.stringify(data.session));
      navigate('/dashboard', { replace: true });
    } else {
      setError('Login successful but no session returned. Please refresh.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2 sm:w-[600px] w-full mx-auto">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Log in to your TicketPro account
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-md">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center text-gray-500 mt-6">
          Don’t have an account?{' '}
          <Link to="/auth/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}


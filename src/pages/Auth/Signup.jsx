// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';


// export default function Signup() {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
//     const [error, setError] = useState('');


//     const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     };


//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!formData.email || !formData.password || !formData.confirmPassword) {
//         setError('All fields are required.');
//         return;
//         }
//         if (formData.password !== formData.confirmPassword) {
//         setError('Passwords do not match.');
//         return;
//         }
//         localStorage.setItem('ticketapp_session', JSON.stringify({ user: formData.email }));
//         navigate('/dashboard');
//     };


//     return (
//         <div className="min-h-screen flex flex-col items-center justify-center px-2 sm:w-[600px] w-full">
//             <div className="bg-white shadow-lg rounded-2xl p-8 w-full">
//                 <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Create Account</h2>
//                 <p className="text-center text-gray-500 mb-8">Join TicketPro today</p>
//                 <form onSubmit={handleSubmit} className="space-y-5">
//                     <div>
//                         <label className="block text-gray-700 mb-1">Email</label>
//                         <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" />
//                     </div>
//                     <div>
//                         <label className="block text-gray-700 mb-1">Password</label>
//                         <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" />
//                     </div>
//                     <div>
//                         <label className="block text-gray-700 mb-1">Confirm Password</label>
//                         <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" />
//                     </div>
//                     {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//                     <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">Sign Up</button>
//                 </form>
//                 <p className="text-center text-gray-500 mt-6">Already have an account? <Link to="/auth/login" className="text-blue-600 hover:underline">Login</Link></p>
//             </div>
//         </div>
//     )
// }

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabase';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2 sm:w-[600px] w-full">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Create an Account</h2>
        <p className="text-center text-gray-500 mb-8">Sign up to start managing your tickets</p>
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
          <div>
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

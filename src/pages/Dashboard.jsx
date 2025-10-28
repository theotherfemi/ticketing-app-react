import { Link } from 'react-router-dom';
import { useAuth } from '../services/auth';

export default function Dashboard() {
  const { logout, session } = useAuth();

  return (
    <main className="w-full py-16">
      <div className="flex justify-between items-center mb-8">
          Welcome Back, {session?.user?.email?.split('@')[0] || 'User'} 👋
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <p className="text-gray-600 mb-12 text-center">
        Here’s an overview of your ticketing system performance.
      </p>

      {/* Overview Stats */}
      <section className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center border-t-4 border-blue-500">
          <h3 className="text-2xl font-bold mb-2">42</h3>
          <p className="text-gray-500">Total Tickets</p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center border-t-4 border-green-500">
          <h3 className="text-2xl font-bold mb-2">28</h3>
          <p className="text-gray-500">Open Tickets</p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center border-t-4 border-red-500">
          <h3 className="text-2xl font-bold mb-2">14</h3>
          <p className="text-gray-500">Resolved Tickets</p>
        </div>
      </section>

      {/* Recent Activity + System Insights */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <ul className="space-y-3 text-gray-700">
            <li>✅ Ticket #234 resolved successfully</li>
            <li>🕐 Ticket #240 moved to In Progress</li>
            <li>📩 New ticket created by John Doe</li>
          </ul>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">System Insights</h3>
          <p className="text-gray-600 mb-2">
            Resolution rate: <span className="font-bold text-green-600">80%</span>
          </p>
          <p className="text-gray-600 mb-2">
            Avg response time: <span className="font-bold text-blue-600">2h 45m</span>
          </p>
          <p className="text-gray-600">
            Most common issue type: <span className="font-bold">Login problems</span>
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-16 bg-blue-50 rounded-3xl p-10 text-center">
        <h3 className="text-2xl font-bold mb-4 text-blue-700">
          Need to Create a New Ticket?
        </h3>
        <p className="mb-6 text-gray-600">
          Quickly submit an issue and track it right from this dashboard.
        </p>
        <Link
          to="/tickets"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Go to Ticket Management
        </Link>
      </section>
    </main>
  );
}

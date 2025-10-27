import { Link } from 'react-router-dom';


export default function LandingPage() {
    return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-800">
    <section className="relative flex flex-col items-center justify-center text-center px-4 py-24 w-full max-w-[1440px] overflow-hidden">
    <div className="absolute inset-0 bg-linear-to-b from-blue-100 to-blue-200 clip-wave"></div>
    <div className="relative z-10 max-w-2xl">
    <h2 className="text-5xl font-extrabold mb-4">Manage Your Tickets Seamlessly</h2>
    <p className="text-lg mb-6">From creation to resolution — all in one intuitive dashboard built for efficiency.</p>
    <Link to="/auth/signup" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Start Managing</Link>
    {/* <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">Sign Up</button> */}
    </div>
    <div className="absolute w-32 h-32 bg-blue-400 opacity-30 rounded-full top-16 right-24 blur-3xl"></div>
    </section>


    <section className="max-w-[1440px] w-full px-6 py-16 grid md:grid-cols-3 gap-8">
    <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
    <h3 className="text-xl font-semibold mb-2">Quick Ticket Creation</h3>
    <p>Easily create and track tickets with status updates and priorities.</p>
    </div>
    <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
    <h3 className="text-xl font-semibold mb-2">Powerful Dashboard</h3>
    <p>View overall ticket stats and track progress in real time.</p>
    </div>
    <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
    <h3 className="text-xl font-semibold mb-2">Secure Authentication</h3>
    <p>Your data stays safe with a secure session-based login system.</p>
    </div>
    </section>


    <section className="max-w-[1440px] w-full px-6 py-16 bg-blue-50 rounded-3xl text-center">
    <h3 className="text-3xl font-bold mb-4">Why Choose TicketPro?</h3>
    <p className="max-w-2xl mx-auto mb-6">TicketPro is designed to simplify ticket tracking, improve response time, and give teams the clarity they need to resolve issues faster.</p>
    <div className="flex flex-wrap justify-center gap-6">
    <div className="bg-white shadow-md rounded-xl p-4 w-64">
    <h4 className="font-semibold mb-2">Collaborative Tools</h4>
    <p>Assign, comment, and track updates seamlessly across your team.</p>
    </div>
    <div className="bg-white shadow-md rounded-xl p-4 w-64">
    <h4 className="font-semibold mb-2">Performance Insights</h4>
    <p>Get real-time analytics on ticket resolution and team performance.</p>
    </div>
    <div className="bg-white shadow-md rounded-xl p-4 w-64">
    <h4 className="font-semibold mb-2">Customizable Workflows</h4>
    <p>Adapt TicketPro to your process — not the other way around.</p>
    </div>
    </div>
    </section>
    </div>
    );
}
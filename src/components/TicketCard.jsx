// import React from 'react'

// const STATUS = {
//     open: 'status.open',
//     in_progress: 'status.in_progress',
//     closed: 'status.closed'
// }


// export default function TicketCard({ ticket, onEdit, onDelete }){
//     const colorClass = ticket.status === 'open' ? 'bg-status-open/10 border-status-open text-status-open' : ticket.status === 'in_progress' ? 'bg-status-in_progress/10 border-status-in_progress text-status-in_progress' : 'bg-status-closed/10 border-status-closed text-status-closed'
//     return (
//         <div className={`p-4 rounded-md shadow-sm border ${colorClass}`}>
//             <div className="flex justify-between items-start">
//                 <div>
//                     <h3 className="text-lg font-semibold">{ticket.title}</h3>
//                     <p className="text-sm text-slate-600 mt-1">{ticket.description}</p>
//                 </div>
//                 <div className="text-right">
//                     <div className="text-xs font-medium uppercase">{ticket.priority || '—'}</div>
//                     <div className="mt-2 flex gap-2">
//                         <button onClick={()=>onEdit(ticket)} className="px-2 py-1 text-sm border rounded">Edit</button>
//                         <button onClick={()=>onDelete(ticket)} className="px-2 py-1 text-sm border rounded text-red-600">Delete</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

import React, { useState, useEffect } from 'react';
import TicketModalForm from './TicketFormModal';
import {
  getTickets,
  createTicket,
  deleteTicket,
  updateTicket,
} from '../services/tickets';

export default function TicketCard() {
  const [tickets, setTickets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setTickets(getTickets());
  }, []);

  const handleAddTicket = (ticketData) => {
    const newTicket = createTicket(ticketData);
    setTickets((prev) => [...prev, newTicket]);
    setIsModalOpen(false);
  };

  const handleDeleteTicket = (id) => {
    deleteTicket(id);
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };

  const handleStatusChange = (id, status) => {
    updateTicket(id, { status });
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  // 🔹 helper for status-based styling
  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return {
          card: 'border-green-200 bg-green-50',
          tag: 'bg-green-100 text-green-700',
        };
      case 'in_progress':
        return {
          card: 'border-amber-200 bg-amber-50',
          tag: 'bg-amber-100 text-amber-700',
        };
      case 'closed':
        return {
          card: 'border-gray-200 bg-gray-50',
          tag: 'bg-gray-100 text-gray-600',
        };
      default:
        return {
          card: 'border-gray-200 bg-white',
          tag: 'bg-gray-100 text-gray-700',
        };
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-600">My Tickets</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + New Ticket
        </button>
      </div>

      {tickets.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No tickets yet — create one to get started!
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tickets.map((ticket) => {
            const styles = getStatusStyles(ticket.status);
            return (
              <div
                key={ticket.id}
                className={`border rounded-xl shadow-sm hover:shadow-md transition p-5 ${styles.card}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {ticket.title}
                  </h3>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${styles.tag}`}
                  >
                    {ticket.status.replace('_', ' ')}
                  </span>
                </div>

                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {ticket.description || 'No description provided.'}
                </p>

                <div className="flex justify-between items-center text-sm">
                  <select
                    value={ticket.status}
                    onChange={(e) =>
                      handleStatusChange(ticket.id, e.target.value)
                    }
                    className="border border-gray-300 rounded-md p-1 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>

                  <button
                    onClick={() => handleDeleteTicket(ticket.id)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isModalOpen && (
        <TicketModalForm
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddTicket}
        />
      )}
    </div>
  );
}

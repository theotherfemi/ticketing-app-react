import React, { useState } from 'react';
import TicketCard from '../components/TicketCard';
import TicketModalForm from '../components/TicketFormModal';
import DeleteModal from '../components/deleteModal';
import { getTickets, createTicket, deleteTicket, updateTicket } from '../services/tickets';

export default function Tickets() {
  const [tickets, setTickets] = useState(getTickets());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState(null);

  const handleAddOrUpdateTicket = (ticketData) => {
    if (editingTicket) {
      updateTicket(editingTicket.id, ticketData);
      setTickets((prev) =>
        prev.map((t) =>
          t.id === editingTicket.id ? { ...t, ...ticketData } : t
        )
      );
      setEditingTicket(null);
    } else {
      const newTicket = createTicket(ticketData);
      setTickets((prev) => [...prev, newTicket]);
    }
    setIsModalOpen(false);
  };

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
    setIsModalOpen(true);
  };

  const handleDeleteRequest = (ticket) => {
    setTicketToDelete(ticket);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (ticketToDelete) {
      deleteTicket(ticketToDelete.id);
      setTickets((prev) => prev.filter((t) => t.id !== ticketToDelete.id));
      setTicketToDelete(null);
    }
    setDeleteModalOpen(false);
  };

  return (
    <div className="w-full mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-600">My Tickets</h2>
        <button
          onClick={() => {
            setEditingTicket(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + New Ticket
        </button>
      </div>

      {/* Tickets Grid */}
      {tickets.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No tickets yet — create one to get started!
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onEdit={handleEdit}
              onDelete={handleDeleteRequest}
            />
          ))}
        </div>
      )}

      {/* Ticket Form Modal */}
      {isModalOpen && (
        <TicketModalForm
          onClose={() => {
            setIsModalOpen(false);
            setEditingTicket(null);
          }}
          onSubmit={handleAddOrUpdateTicket}
          initialData={editingTicket}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

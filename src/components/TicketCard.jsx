import React from 'react';

export default function TicketCard({ ticket, onEdit, onDelete }) {
  const formatStatus = (status) => {
    const map = {
      open: 'Open',
      in_progress: 'In Progress',
      closed: 'Closed',
    };
    return map[status] || status;
  };

  const getCardStyles = () => {
    switch (ticket.status) {
      case 'open':
        return 'bg-green-50 border-green-200';
      case 'in_progress':
        return 'bg-amber-50 border-amber-200';
      case 'closed':
        return 'bg-gray-100 border-gray-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  const getTextColor = () => {
    switch (ticket.status) {
      case 'open':
        return 'text-green-700';
      case 'in_progress':
        return 'text-amber-700';
      case 'closed':
        return 'text-gray-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div
      className={`p-5 rounded-lg shadow-md border hover:shadow-lg transition ${getCardStyles()}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{ticket.title}</h3>
        <span className={`text-sm font-medium ${getTextColor()}`}>
          {formatStatus(ticket.status)}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-4 line-clamp-3">
        {ticket.description || 'No description provided.'}
      </p>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => onEdit(ticket)}
          className="text-sm text-amber-600 hover:text-amber-700 font-medium"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(ticket)}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

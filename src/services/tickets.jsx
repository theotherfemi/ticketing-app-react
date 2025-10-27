const STORAGE_KEY = 'ticketpro_tickets';

// ✅ Get all tickets
export function getTickets() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

// ✅ Create a new ticket
export function createTicket(ticket) {
  const tickets = getTickets();
  const newTicket = {
    id: Date.now(),
    title: ticket.title || 'Untitled Ticket',
    description: ticket.description || '',
    status: ticket.status || 'Pending',
    createdAt: new Date().toISOString(),
  };
  tickets.push(newTicket);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  return newTicket;
}

// ✅ Delete ticket by ID
export function deleteTicket(id) {
  const tickets = getTickets().filter((t) => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

// ✅ Update existing ticket
export function updateTicket(id, updates) {
  const tickets = getTickets().map((t) =>
    t.id === id ? { ...t, ...updates } : t
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

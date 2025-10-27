import React from 'react'

const STATUS = {
    open: 'status.open',
    in_progress: 'status.in_progress',
    closed: 'status.closed'
}


export default function TicketCard({ ticket, onEdit, onDelete }){
    const colorClass = ticket.status === 'open' ? 'bg-status-open/10 border-status-open text-status-open' : ticket.status === 'in_progress' ? 'bg-status-in_progress/10 border-status-in_progress text-status-in_progress' : 'bg-status-closed/10 border-status-closed text-status-closed'
    return (
        <div className={`p-4 rounded-md shadow-sm border ${colorClass}`}>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold">{ticket.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{ticket.description}</p>
                </div>
                <div className="text-right">
                    <div className="text-xs font-medium uppercase">{ticket.priority || '—'}</div>
                    <div className="mt-2 flex gap-2">
                        <button onClick={()=>onEdit(ticket)} className="px-2 py-1 text-sm border rounded">Edit</button>
                        <button onClick={()=>onDelete(ticket)} className="px-2 py-1 text-sm border rounded text-red-600">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
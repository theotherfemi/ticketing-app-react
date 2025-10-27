import React, { useState } from 'react'
import { useTickets } from '../services/ticketService'
import TicketCard from '../components/TicketCard'
import TicketFormModal from '../components/TicketFormModal'


export default function Tickets(){
    const { tickets, create, update, remove } = useTickets()
    const [open, setOpen] = useState(false)
    const [editing, setEditing] = useState(null)


    const handleCreate = (data)=>{
        create(data)
    }
    const handleEdit = (data)=>{
        update(editing.id, data)
        setEditing(null)
    }
    const handleDelete = (ticket)=>{
        if(confirm('Delete this ticket?')) remove(ticket.id)
    }


    return (
        <div className="py-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Tickets</h1>
                <div>
                    <button onClick={()=>{ setEditing(null); setOpen(true) }} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">New Ticket</button>
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {tickets.length === 0 ? <div className="p-6 bg-white rounded shadow">No tickets yet</div> : tickets.map(t=> (
                    <TicketCard key={t.id} ticket={t} onEdit={(x)=>{ setEditing(x); setOpen(true) }} onDelete={handleDelete} />
                ))}
            </div>


            <TicketFormModal open={open} initial={editing} onClose={()=>setOpen(false)} onSubmit={editing? handleEdit : handleCreate} />
        </div>
    )
}
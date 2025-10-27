import React, { useState, useEffect } from 'react'
import { validateTicket } from '../utils/validator'

export default function TicketFormModal({ open, onClose, onSubmit, initial }){
    const [form, setForm] = useState({ title: '', status: 'open', description: '', priority: 'low' })
    const [errors, setErrors] = useState({})

    useEffect(()=>{ if(initial) setForm({...form, ...initial}) }, [initial])
    useEffect(()=>{ if(!open) setErrors({}) }, [open])

    const change = (k,v)=> setForm(prev => ({ ...prev, [k]: v }))
    const save = ()=>{
    const e = validateTicket(form)
    setErrors(e)
        if(Object.keys(e).length) return
        try{ onSubmit(form); onClose(); }catch(err){ setErrors({ form: err.message }) }
    }

    if(!open) return null
    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-40">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6">
                <h2 className="text-xl font-semibold mb-4">{initial? 'Edit Ticket' : 'Create Ticket'}</h2>
                {errors.form && <div className="text-red-600 mb-2">{errors.form}</div>}
                <div className="grid grid-cols-1 gap-3">
                    <label className="flex flex-col">
                        <span className="text-sm font-medium">Title *</span>
                        <input value={form.title} onChange={e=>change('title', e.target.value)} className="border p-2 rounded" />
                        {errors.title && <div className="text-sm text-red-600">{errors.title}</div>}
                    </label>


                    <label className="flex flex-col">
                        <span className="text-sm font-medium">Status *</span>
                        <select value={form.status} onChange={e=>change('status', e.target.value)} className="border p-2 rounded">
                            <option value="open">Open</option>
                            <option value="in_progress">In Progress</option>
                            <option value="closed">Closed</option>
                        </select>
                        {errors.status && <div className="text-sm text-red-600">{errors.status}</div>}
                    </label>


                    <label className="flex flex-col">
                        <span className="text-sm font-medium">Priority</span>
                        <select value={form.priority} onChange={e=>change('priority', e.target.value)} className="border p-2 rounded">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </label>


                    <label className="flex flex-col">
                        <span className="text-sm font-medium">Description</span>
                        <textarea value={form.description} onChange={e=>change('description', e.target.value)} className="border p-2 rounded h-24" />
                        {errors.description && <div className="text-sm text-red-600">{errors.description}</div>}
                    </label>


                    <div className="flex justify-end gap-2 mt-2">
                        <button onClick={onClose} className="px-4 py-2">Cancel</button>
                        <button onClick={save} className="px-4 py-2 bg-sky-600 text-white rounded">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
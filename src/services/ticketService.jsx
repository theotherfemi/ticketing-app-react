import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './auth'


const STORAGE = 'ticketapp_tickets_v1'
const TicketsContext = createContext()


export function TicketsProvider({ children }){
    const { session, setToast } = useAuth()
    const [tickets, setTickets] = useState(()=>{
        try{ return JSON.parse(localStorage.getItem(STORAGE)) || [] }catch{ return [] }
    })

    useEffect(()=>{
        localStorage.setItem(STORAGE, JSON.stringify(tickets))
    },[tickets])

    useEffect(()=>{
    // if session expires elsewhere, optionally handle
    },[session])

    const create = (data)=>{
        // validation important but forms validate; defensive here
        if(!data.title || !['open','in_progress','closed'].includes(data.status)){
            throw new Error('Invalid ticket data')
        }
        const t = { ...data, id: Date.now() }
            setTickets(prev => [t, ...prev])
            setToast && setToast({ type: 'success', msg: 'Ticket created' })
            return t
    }

    const update = (id, patch)=>{
        setTickets(prev => prev.map(t=> t.id === id ? { ...t, ...patch } : t))
        setToast && setToast({ type: 'success', msg: 'Ticket updated' })
    }

    const remove = (id)=>{
        setTickets(prev => prev.filter(t=> t.id !== id))
        setToast && setToast({ type: 'success', msg: 'Ticket deleted' })
    }


    return (
        <TicketsContext.Provider value={{ tickets, create, update, remove }}>
            {children}
        </TicketsContext.Provider>
    )
}


export function useTickets(){ return useContext(TicketsContext) }
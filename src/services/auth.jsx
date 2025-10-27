import React, { createContext, useContext, useState, useEffect } from 'react'

const KEY = 'ticketapp_session'
const AuthContext = createContext()

export function AuthProvider({ children }){
    const [session, setSession] = useState(()=>{
        try{ return JSON.parse(localStorage.getItem(KEY)) }catch{ return null }
    })
    const [toast, setToast] = useState(null)

    useEffect(()=>{
        if(session) localStorage.setItem(KEY, JSON.stringify(session))
        else localStorage.removeItem(KEY)
    },[session])

    const login = async ({ email, password })=>{
        // simple mock: accept any non-empty credentials
        if(!email || !password) throw new Error('Invalid credentials')
        const user = { id: Date.now(), email }
        const token = btoa(email + ':' + Date.now())
        const s = { user, token }
        setSession(s)
        return s
    }

    const signup = async ({ email, password })=>{
        if(!email || !password) throw new Error('Invalid details')
        // mimic server delay
        return login({ email, password })
    }

    const logout = ()=>{
        setSession(null)
    }

    return (
        <AuthContext.Provider value={{ session, login, signup, logout, toast, setToast }}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth(){ return useContext(AuthContext) }
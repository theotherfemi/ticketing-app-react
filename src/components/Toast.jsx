import React, { useEffect, useState } from 'react'
import { useAuth } from '../services/auth'


export default function Toast(){
    const { toast, setToast } = useAuth()
    const [visible, setVisible] = useState(false)


    useEffect(()=>{
        if(toast){ setVisible(true); const t = setTimeout(()=>{ setVisible(false); setToast(null) }, 3000); return ()=>clearTimeout(t) }
    },[toast, setToast])


    if(!toast || !visible) return null
    return (
        <div className="toast">
            <div className="font-medium">{toast.type === 'error' ? 'Error' : 'Success'}</div>
            <div className="text-sm mt-1">{toast.msg}</div>
        </div>
    )
}
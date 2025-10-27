export function validateTicket({ title, status, description, priority }){
    const errors = {}
    if(!title || title.trim().length === 0) errors.title = 'Title is required.'
    if(!status || !['open','in_progress','closed'].includes(status)) errors.status = 'Status must be open, in_progress or closed.'
    if(description && description.length > 1000) errors.description = 'Description is too long.'
    if(priority && !['low','medium','high'].includes(priority)) errors.priority = 'Invalid priority.'
    return errors
}
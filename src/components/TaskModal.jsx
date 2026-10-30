import { useEffect, useState } from 'react'
import { Check, X, AlertCircle } from 'lucide-react'
import { STATUSES, PRIORITIES, today } from '../constants/kanban'

export default function TaskModal({ task, defaultStatus, onClose, onSave }) {
  const [title, setTitle] = useState(task?.title ?? '')
  const [description, setDescription] = useState(task?.description ?? '')
  const [priority, setPriority] = useState(task?.priority ?? 'Medium')
  const [dueDate, setDueDate] = useState(task?.dueDate ?? '')
  const [status, setStatus] = useState(task?.status ?? defaultStatus)
  const [error, setError] = useState('')
  useEffect(() => { const handleKey = e => { if (e.key === 'Escape') onClose() }; window.addEventListener('keydown', handleKey); return () => window.removeEventListener('keydown', handleKey) }, [onClose])
  function submit(e) {
    e.preventDefault()
    if (!title.trim()) { setError('Please enter a task title.'); return }
    if (title.trim().length > 90) { setError('Keep the title under 90 characters.'); return }
    if (description.length > 400) { setError('Keep the description under 400 characters.'); return }
    if (dueDate && dueDate < today() && task?.dueDate !== dueDate) { setError('Choose today or a future due date.'); return }
    onSave({ title: title.trim(), description: description.trim(), priority, dueDate, status })
  }
  const fieldClass = 'mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50'
  return <div className="fixed inset-0 z-40 flex items-end justify-center bg-slate-950/35 p-0 backdrop-blur-[3px] sm:items-center sm:p-4" onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}><div role="dialog" aria-modal="true" aria-labelledby="task-modal-title" className="max-h-[94vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:max-w-lg sm:rounded-2xl"><div className="flex items-start justify-between border-b border-slate-100 px-5 py-4 sm:px-6 sm:py-5"><div><h2 id="task-modal-title" className="text-lg font-bold tracking-tight text-slate-900">{task ? 'Edit task' : 'Create a task'}</h2><p className="mt-1 text-xs text-slate-500">{task ? 'Make changes to your task details.' : 'Add the details to keep your work on track.'}</p></div><button aria-label="Close dialog" onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X size={18}/></button></div>
    <form onSubmit={submit} className="space-y-4 px-5 py-5 sm:px-6"><div><label htmlFor="task-title" className="text-xs font-bold text-slate-700">Task title <span className="text-rose-500">*</span></label><input autoFocus id="task-title" maxLength={90} value={title} onChange={e => { setTitle(e.target.value); setError('') }} placeholder="e.g. Prepare project presentation" className={fieldClass}/><div className="mt-1 flex justify-between text-[10px] text-slate-400"><span>A clear, action-oriented title works best.</span><span>{title.length}/90</span></div></div>
    <div><label htmlFor="task-description" className="text-xs font-bold text-slate-700">Description <span className="font-normal text-slate-400">(optional)</span></label><textarea id="task-description" rows={3} maxLength={400} value={description} onChange={e => setDescription(e.target.value)} placeholder="Add context, notes, or next steps..." className={`${fieldClass} resize-y`}/><div className="mt-1 text-right text-[10px] text-slate-400">{description.length}/400</div></div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2"><div><label htmlFor="task-priority" className="text-xs font-bold text-slate-700">Priority</label><select id="task-priority" value={priority} onChange={e => setPriority(e.target.value)} className={fieldClass}>{PRIORITIES.map(p => <option key={p}>{p}</option>)}</select></div><div><label htmlFor="task-due-date" className="text-xs font-bold text-slate-700">Due date <span className="font-normal text-slate-400">(optional)</span></label><input id="task-due-date" type="date" min={task?.dueDate && task.dueDate < today() ? task.dueDate : today()} value={dueDate} onChange={e => setDueDate(e.target.value)} className={fieldClass}/></div></div>
    <div><label htmlFor="task-status" className="text-xs font-bold text-slate-700">Status</label><select id="task-status" value={status} onChange={e => setStatus(e.target.value)} className={fieldClass}>{STATUSES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}</select></div>
    {error && <p role="alert" className="flex items-center gap-2 rounded-xl bg-rose-50 px-3 py-2.5 text-xs font-medium text-rose-700"><AlertCircle size={15}/>{error}</p>}
    <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end"><button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">Cancel</button><button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100"><Check size={16}/>{task ? 'Save changes' : 'Create task'}</button></div>
    </form></div></div>
}

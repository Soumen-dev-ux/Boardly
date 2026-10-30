import { useEffect, useMemo, useState } from 'react'
import { Check } from 'lucide-react'
import { readTasks } from './utils/taskUtils'
import AppHeader from './components/AppHeader'
import DashboardIntro from './components/DashboardIntro'
import TaskFilters from './components/TaskFilters'
import KanbanBoard from './components/KanbanBoard'
import TaskModal from './components/TaskModal'
import ConfirmDialog from './components/ConfirmDialog'

const STORAGE_KEY = 'boardly-tasks-v1'

export default function App() {
  const [tasks, setTasks] = useState(readTasks)
  const [query, setQuery] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('All priorities')
  const [statusFilter, setStatusFilter] = useState('All statuses')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [deleteTask, setDeleteTask] = useState(null)
  const [notice, setNotice] = useState('')
  const [menuTask, setMenuTask] = useState(null)

  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)) } catch { setNotice('Could not save changes in this browser.') } }, [tasks])
  useEffect(() => { if (!notice) return; const timer = setTimeout(() => setNotice(''), 2800); return () => clearTimeout(timer) }, [notice])

  const filteredTasks = useMemo(() => tasks.filter(task => {
    const matchesQuery = `${task.title} ${task.description}`.toLowerCase().includes(query.trim().toLowerCase())
    const matchesPriority = priorityFilter === 'All priorities' || task.priority === priorityFilter
    const matchesStatus = statusFilter === 'All statuses' || task.status === statusFilter
    return matchesQuery && matchesPriority && matchesStatus
  }), [tasks, query, priorityFilter, statusFilter])
  const stats = useMemo(() => ({ total: tasks.length, done: tasks.filter(t => t.status === 'done').length, active: tasks.filter(t => t.status === 'progress').length }), [tasks])
  const hasFilters = Boolean(query.trim() || priorityFilter !== 'All priorities' || statusFilter !== 'All statuses')

  function openCreate(status = 'todo') { setEditingTask({ status }); setModalOpen(true) }
  function openEdit(task) { setEditingTask(task); setModalOpen(true); setMenuTask(null) }
  function closeModal() { setModalOpen(false); setEditingTask(null) }
  function saveTask(form) {
    if (editingTask?.id) { setTasks(prev => prev.map(task => task.id === editingTask.id ? { ...task, ...form } : task)); setNotice('Task updated successfully') }
    else { setTasks(prev => [{ ...form, id: crypto.randomUUID?.() ?? String(Date.now()), createdAt: Date.now() }, ...prev]); setNotice('Task added to your board') }
    closeModal()
  }
  function moveTask(id, status) { setTasks(prev => prev.map(task => task.id === id ? { ...task, status } : task)); setMenuTask(null) }
  function removeTask() { setTasks(prev => prev.filter(task => task.id !== deleteTask.id)); setDeleteTask(null); setNotice('Task deleted') }
  function clearFilters() { setQuery(''); setPriorityFilter('All priorities'); setStatusFilter('All statuses') }

  return <div className="min-h-screen bg-[#f7f8fb] text-slate-800">
    <AppHeader onCreate={() => openCreate('todo')} />
    <main className="mx-auto max-w-[1440px] px-4 pb-12 pt-7 sm:px-6 sm:pt-9 lg:px-8">
      <DashboardIntro stats={stats}/>
      <TaskFilters query={query} setQuery={setQuery} priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter} statusFilter={statusFilter} setStatusFilter={setStatusFilter} hasFilters={hasFilters} clearFilters={clearFilters} count={filteredTasks.length}/>
      <KanbanBoard tasks={filteredTasks} hasFilters={hasFilters} onClearFilters={clearFilters} onCreate={openCreate} onEdit={openEdit} onDelete={setDeleteTask} onMove={moveTask} menuTask={menuTask} setMenuTask={setMenuTask}/>
      <footer className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-slate-200/80 pt-5 text-xs text-slate-400 sm:flex-row"><p className="flex items-center gap-1.5"><span className="font-semibold text-slate-500">boardly.</span> Simple planning, steady progress.</p><p className="flex items-center gap-1.5"><Check size={13} className="text-emerald-500"/> Your tasks are saved in this browser</p></footer>
    </main>
    {modalOpen && <TaskModal key={editingTask?.id || `new-${editingTask?.status || 'todo'}`} task={editingTask?.id ? editingTask : null} defaultStatus={editingTask?.status || 'todo'} onClose={closeModal} onSave={saveTask}/>}
    {deleteTask && <ConfirmDialog title="Delete this task?" description={`“${deleteTask.title}” will be permanently removed from your board.`} onCancel={() => setDeleteTask(null)} onConfirm={removeTask}/>}
    {notice && <div role="status" className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-xl"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><Check size={13}/></span>{notice}</div>}
  </div>
}

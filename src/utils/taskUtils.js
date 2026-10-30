import { STORAGE_KEY, initialTasks, today } from '../constants/kanban'

function readTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved !== null) return JSON.parse(saved)
  } catch { /* recover with a clean starter board */ }
  return initialTasks
}
function formatDate(date) {
  if (!date) return ''
  return new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
function isOverdue(date, status) { return Boolean(date && date < today() && status !== 'done') }


export { readTasks, formatDate, isOverdue }

import { Activity, CheckCheck, Circle } from 'lucide-react'

const STATUSES = [
  { id: 'todo', label: 'To do', icon: Circle },
  { id: 'progress', label: 'In progress', icon: Activity },
  { id: 'done', label: 'Completed', icon: CheckCheck },
]
const PRIORITIES = ['Low', 'Medium', 'High']
const STORAGE_KEY = 'boardly-tasks-v1'
const today = () => new Date().toISOString().slice(0, 10)
const initialTasks = [
  { id: 'seed-1', title: 'Map out onboarding flow', description: 'Review the first-time user journey and identify friction points.', priority: 'High', dueDate: today(), status: 'todo', createdAt: Date.now() - 5000 },
  { id: 'seed-2', title: 'Polish dashboard cards', description: 'Align spacing, update hover states, and check responsive breakpoints.', priority: 'Medium', dueDate: '', status: 'todo', createdAt: Date.now() - 4000 },
  { id: 'seed-3', title: 'Write release notes', description: 'Summarize the latest improvements for the team.', priority: 'Low', dueDate: '', status: 'todo', createdAt: Date.now() - 3000 },
  { id: 'seed-4', title: 'Build task filtering', description: 'Add quick filters for priority and task status.', priority: 'High', dueDate: '', status: 'progress', createdAt: Date.now() - 2000 },
  { id: 'seed-5', title: 'Create empty states', description: 'Make blank columns feel helpful instead of unfinished.', priority: 'Medium', dueDate: '', status: 'progress', createdAt: Date.now() - 1000 },
  { id: 'seed-6', title: 'Set up project repository', description: 'Initialize the app and configure the build tooling.', priority: 'Low', dueDate: '', status: 'done', createdAt: Date.now() - 500 },
]


export { STATUSES, PRIORITIES, STORAGE_KEY, today, initialTasks }

import { Check, ClipboardList, Clock3, Sparkles } from 'lucide-react'
import StatCard from './StatCard'

export default function DashboardIntro({ stats }) {
  return <section className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
    <div><div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700"><Sparkles size={13}/> Your personal workspace</div><h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-[34px]">Task board</h1><p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-[15px]">A little structure goes a long way. Keep your priorities clear and your work moving.</p></div>
    <div className="grid grid-cols-3 gap-2 sm:min-w-[340px] sm:gap-3"><StatCard label="Total tasks" value={stats.total} icon={ClipboardList} tone="indigo"/><StatCard label="In progress" value={stats.active} icon={Clock3} tone="blue"/><StatCard label="Completed" value={stats.done} icon={Check} tone="green"/></div>
  </section>
}

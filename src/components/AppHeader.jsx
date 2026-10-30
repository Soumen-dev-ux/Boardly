import { LayoutGrid, Plus } from 'lucide-react'

export default function AppHeader({ onCreate }) {
  return <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
    <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200"><LayoutGrid size={19} strokeWidth={2.4}/></div><div><div className="text-[17px] font-bold tracking-tight text-slate-900">boardly<span className="text-indigo-600">.</span></div><div className="-mt-0.5 text-[10px] font-semibold uppercase tracking-[.16em] text-slate-400">Workspace</div></div></div>
      <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500 sm:flex"><span className="h-2 w-2 rounded-full bg-emerald-500"/> All changes saved locally</div>
      <button onClick={onCreate} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 sm:px-4"><Plus size={17}/> <span className="hidden sm:inline">New task</span><span className="sm:hidden">Add task</span></button>
    </div>
  </header>
}

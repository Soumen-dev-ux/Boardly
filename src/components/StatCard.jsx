export default function StatCard({ label, value, icon: Icon, tone }) {
  const tones = { indigo: 'bg-indigo-50 text-indigo-600', blue: 'bg-blue-50 text-blue-600', green: 'bg-emerald-50 text-emerald-600' }
  return <div className="rounded-2xl border border-slate-200/80 bg-white px-2.5 py-3 shadow-[0_2px_8px_rgba(15,23,42,0.02)] sm:px-4 sm:py-3.5"><div className="flex items-center justify-between gap-1"><span className="truncate text-[10px] font-semibold text-slate-500 sm:text-xs">{label}</span><span className={`hidden h-7 w-7 items-center justify-center rounded-lg sm:flex ${tones[tone]}`}><Icon size={15}/></span></div><div className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:mt-2 sm:text-2xl">{value}</div></div>
}

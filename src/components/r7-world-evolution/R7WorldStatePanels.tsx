import { r7DailyWorld, r7HealthMetrics, r7WorldState } from '@/features/r7-world-evolution'

export function R7WorldStatePanels() {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">今日世界</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{r7DailyWorld.greeting}</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {r7DailyWorld.sections.map((section) => (
            <div key={section.id} className="rounded-2xl bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-900">{section.title}</h3>
              <ul className="mt-2 space-y-1 text-sm leading-6 text-slate-600">
                {section.items.map((item) => <li key={item}>· {item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">世界状态</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{r7WorldState.mode} · {r7WorldState.mood}</p>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
          {r7HealthMetrics.map((metric) => (
            <li key={metric.id} className="rounded-2xl bg-slate-50 p-3">
              <span className="font-semibold text-slate-900">{metric.label}：{metric.value}</span>
              <span className="block">{metric.target}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

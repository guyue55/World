
import { r3TimelineEvents } from '@/features/_legacy/r3-content-life'

export function R3LifecycleRiver() {
  const events = [...r3TimelineEvents].sort((left, right) => left.date.localeCompare(right.date)).slice(-10)
  return (
    <section className="rounded-[2rem] border border-sky-100 bg-sky-50/80 p-6 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-600">Time River</p>
      <h2 className="mt-2 text-3xl font-semibold text-slate-950">节点流入时间河</h2>
      <div className="mt-6 space-y-3">
        {events.map((event) => (
          <div key={`${event.date}-${event.nodeId}`} className="grid gap-3 rounded-2xl border border-sky-100 bg-white p-4 sm:grid-cols-[140px_1fr_120px]">
            <span className="text-sm font-medium text-sky-700">{event.date}</span>
            <span className="text-slate-800">{event.title}</span>
            <span className="text-sm text-slate-500">{event.lifeStage}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

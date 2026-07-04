import { getR7PublicWorldLog, r7EvolutionBoundary, r7R8Handoff, r7ReflectionCycles } from '@/features/r7-world-evolution'

export function R7EvolutionBoundaryPanel() {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50/80 p-5">
        <h2 className="text-lg font-semibold text-amber-950">自演化边界</h2>
        <ul className="mt-4 space-y-2 text-sm leading-6 text-amber-900">
          {r7EvolutionBoundary.rules.map((rule) => <li key={rule}>· {rule}</li>)}
        </ul>
      </div>
      <div className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">世界日志与 R8 交接</h2>
        <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
          {getR7PublicWorldLog().map((event) => <li key={event.id}>· {event.title}：{event.summary}</li>)}
          {r7ReflectionCycles.map((cycle) => <li key={cycle.id}>· {cycle.name} → {cycle.output}</li>)}
          {r7R8Handoff.map((item) => <li key={item}>· {item}</li>)}
        </ul>
      </div>
    </section>
  )
}

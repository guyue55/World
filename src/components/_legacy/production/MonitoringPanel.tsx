import { getPhaseEightMonitoringErrorTrackingPlan } from '@/lib/phase-eight-operations'

export function MonitoringPanel() {
  const plan = getPhaseEightMonitoringErrorTrackingPlan()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">监控与错误追踪</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-4">
        {plan.channels.map((item) => (
          <article key={item.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{item.evidence}</p>
            <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm text-ink/60">enabled: {String(item.enabled)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

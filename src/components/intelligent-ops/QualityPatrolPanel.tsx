import { getAutomatedQualityPatrolPlan } from '@/lib/phase-ten-quality'

export function QualityPatrolPanel() {
  const plan = getAutomatedQualityPatrolPlan()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">自动质量巡检</h2>
      <p className="mt-2 text-sm text-ink/55">patrolReady: {String(plan.patrolReady)}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plan.checks.map((item) => (
          <article key={item.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{item.status}</p>
            <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm text-ink/60">{item.source}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

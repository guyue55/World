import { getPhaseEightProductionSmokePlan } from '@/lib/phase-eight-operations'

export function ProductionSmokePanel() {
  const plan = getPhaseEightProductionSmokePlan()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">生产 Smoke 测试</h2>
      <p className="mt-2 text-sm text-ink/55">productionSmokePassed: {String(plan.productionSmokePassed)}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plan.checks.map((item) => (
          <article key={item.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{item.status}</p>
            <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm text-ink/60">{item.type}</p>
            <p className="mt-2 text-sm text-ink/60">required: {String(item.required)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

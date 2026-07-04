import { getPhaseEightProductionEnvironmentMatrix } from '@/lib/phase-eight-production'

export function ProductionEnvironmentPanel() {
  const matrix = getPhaseEightProductionEnvironmentMatrix()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">生产环境矩阵</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {matrix.environments.map((item) => (
          <article key={item.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{item.deployment}</p>
            <h3 className="mt-3 text-xl font-semibold">{item.id}</h3>
            <p className="mt-3 text-sm text-ink/60">{item.purpose}</p>
            <p className="mt-2 text-sm text-ink/60">signoff: {String(item.requiresSignoff)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

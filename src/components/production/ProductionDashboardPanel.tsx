import { getPhaseEightProductionDashboard } from '@/lib/phase-eight-production'

export function ProductionDashboardPanel() {
  const dashboard = getPhaseEightProductionDashboard()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">生产发布看板</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-5">
        {dashboard.cards.map((card) => (
          <article key={card.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{card.state}</p>
            <h3 className="mt-3 text-lg font-semibold">{card.title}</h3>
            <p className="mt-3 text-sm text-ink/60">{card.route}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

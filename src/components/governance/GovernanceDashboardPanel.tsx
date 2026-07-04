import { getPlatformGovernanceDashboardPlan } from '@/lib/phase-twelve-team'

export function GovernanceDashboardPanel() {
  const dashboard = getPlatformGovernanceDashboardPlan()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">治理控制台</h2>
      <p className="mt-2 text-sm text-ink/55">governanceDashboardReady: {String(dashboard.governanceDashboardReady)}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-4">
        {dashboard.cards.map((card) => (
          <article key={card.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{card.state}</p>
            <h3 className="mt-3 text-lg font-semibold">{card.title}</h3>
          </article>
        ))}
      </div>
    </section>
  )
}

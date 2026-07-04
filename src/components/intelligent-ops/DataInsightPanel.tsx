import { getLongTermDataInsightPlan } from '@/lib/phase-ten-quality'

export function DataInsightPanel() {
  const plan = getLongTermDataInsightPlan()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">长期数据洞察</h2>
      <p className="mt-2 text-sm text-ink/55">insightReady: {String(plan.insightReady)}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-5">
        {plan.signals.map((item) => (
          <article key={item.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{item.privacy}</p>
            <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm text-ink/60">{item.status}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

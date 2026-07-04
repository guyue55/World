import { getPublicWorldBookPublishingPlan } from '@/lib/phase-nine-feedback'

export function WorldBookPanel() {
  const plan = getPublicWorldBookPublishingPlan()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">公开世界册出版计划</h2>
      <p className="mt-2 text-sm text-ink/55">worldBookReady: {String(plan.worldBookReady)}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {plan.sections.map((item) => (
          <article key={item.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{item.source}</p>
            <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm text-ink/60">visibility: {item.visibility}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

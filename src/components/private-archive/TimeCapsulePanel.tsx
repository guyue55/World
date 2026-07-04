import { getTimeCapsuleAnnualBookPlan } from '@/lib/phase-five-inheritance'

export function TimeCapsulePanel() {
  const plan = getTimeCapsuleAnnualBookPlan()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">TIME CAPSULE</p>
      <h2 className="mt-3 text-3xl font-semibold">时间胶囊</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {plan.timeCapsules.map((capsule) => (
          <article key={capsule.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{capsule.tier}</p>
            <h3 className="mt-3 text-xl font-semibold">{capsule.title}</h3>
            <p className="mt-3 text-sm text-ink/60">contentStored: {String(capsule.contentStored)}</p>
            <p className="mt-2 text-sm text-ink/60">openRule: {capsule.openRule}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

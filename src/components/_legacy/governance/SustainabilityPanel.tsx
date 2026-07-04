import { getLongTermSustainabilityGovernancePlan } from '@/lib/phase-twelve-team'

export function SustainabilityPanel() {
  const plan = getLongTermSustainabilityGovernancePlan()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">长期可持续治理</h2>
      <p className="mt-2 text-sm text-ink/55">sustainabilityReady: {String(plan.sustainabilityReady)}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {plan.tracks.map((track) => (
          <article key={track.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{track.cadence}</p>
            <h3 className="mt-3 text-lg font-semibold">{track.title}</h3>
          </article>
        ))}
      </div>
    </section>
  )
}

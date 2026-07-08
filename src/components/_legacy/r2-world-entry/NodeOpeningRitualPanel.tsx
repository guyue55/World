import { r2NodeOpeningRituals } from '@/features/_legacy/r2-world-experience'

export function NodeOpeningRitualPanel() {
  return (
    <section className="rounded-[2.5rem] border border-white/70 bg-white/80 p-6 shadow-soft">
      <p className="text-xs uppercase tracking-[0.28em] text-ink/45">Node Opening</p>
      <h2 className="mt-3 text-3xl font-semibold">阅读不是跳转，是展开</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {r2NodeOpeningRituals.map((ritual) => (
          <article key={ritual.type} className="rounded-3xl bg-ink/5 p-5">
            <p className="text-sm uppercase tracking-[0.18em] text-ink/45">{ritual.type}</p>
            <p className="mt-3 leading-7 text-ink/65">{ritual.ritual}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

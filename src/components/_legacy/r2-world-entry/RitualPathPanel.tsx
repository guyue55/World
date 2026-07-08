import { r2ArrivalRituals } from '@/features/_legacy/r2-world-experience'

export function RitualPathPanel() {
  return (
    <section className="rounded-[2.5rem] border border-white/70 bg-white/80 p-6 shadow-soft">
      <p className="text-xs uppercase tracking-[0.28em] text-ink/45">Arrival Rituals</p>
      <h2 className="mt-3 text-3xl font-semibold">进入区域时，像抵达某地</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {r2ArrivalRituals.map((ritual) => (
          <article key={ritual.area} className="rounded-3xl bg-ink/5 p-5">
            <h3 className="text-xl font-semibold">{ritual.area}</h3>
            <p className="mt-2 text-sm text-ink/50">{ritual.visual}</p>
            <p className="mt-3 leading-7 text-ink/65">{ritual.copy}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

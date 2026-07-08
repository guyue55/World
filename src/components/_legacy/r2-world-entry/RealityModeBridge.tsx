import { r2ModeSwitching } from '@/features/_legacy/r2-world-experience'

export function RealityModeBridge() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {r2ModeSwitching.map((mode) => (
        <article key={mode.id} className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-soft">
          <p className="text-xs uppercase tracking-[0.28em] text-ink/45">{mode.id}</p>
          <h2 className="mt-3 text-2xl font-semibold">{mode.name}</h2>
          <p className="mt-3 leading-7 text-ink/65">{mode.purpose}</p>
        </article>
      ))}
    </section>
  )
}

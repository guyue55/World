import { r2CompassAnchors } from '@/features/r2-world-experience'

export function WorldCompassGuide() {
  return (
    <section className="grid gap-3 md:grid-cols-7">
      {r2CompassAnchors.map((anchor, index) => (
        <article key={anchor.id} className="rounded-3xl border border-white/70 bg-white/75 p-4 shadow-soft">
          <p className="text-xs text-ink/40">{String(index + 1).padStart(2, '0')}</p>
          <h3 className="mt-2 font-semibold">{anchor.label}</h3>
          <p className="mt-2 text-xs leading-5 text-ink/55">{anchor.implementation}</p>
        </article>
      ))}
    </section>
  )
}

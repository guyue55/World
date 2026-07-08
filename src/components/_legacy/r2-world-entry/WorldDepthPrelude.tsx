import { r2HomeComposition } from '@/features/_legacy/r2-world-experience'

export function WorldDepthPrelude() {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {r2HomeComposition.layers.map((layer) => (
        <article key={layer.id} className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-soft">
          <p className="text-xs uppercase tracking-[0.28em] text-ink/45">{layer.id}</p>
          <h2 className="mt-3 text-2xl font-semibold">{layer.name}</h2>
          <p className="mt-3 leading-7 text-ink/65">{layer.purpose}</p>
          <p className="mt-5 text-sm text-ink/50">{layer.elements.join(' · ')}</p>
        </article>
      ))}
    </section>
  )
}

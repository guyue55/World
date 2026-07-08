import { WORLD_LAYERS } from '@/lib/world-core'

export function WorldLayerGrid() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {WORLD_LAYERS.map((layer) => (
        <article key={layer.id} className="rounded-world border border-ink/10 bg-white/45 p-5 shadow-soft">
          <p className="text-xs uppercase tracking-[0.25em] text-moss">{layer.id}</p>
          <h3 className="mt-4 text-xl font-semibold">{layer.title}</h3>
          <p className="mt-3 leading-7 text-ink/65">{layer.description}</p>
        </article>
      ))}
    </section>
  )
}

import { getPrivateArchiveBoundaryPolicy } from '@/lib/private-archive'

export function PrivateArchiveBoundaryPanel() {
  const policy = getPrivateArchiveBoundaryPolicy()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">私密层级边界</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {policy.layers.map((layer) => (
          <article key={layer.tier} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{layer.tier}</p>
            <h3 className="mt-3 font-semibold">public build: {layer.publicBuild}</h3>
            <p className="mt-3 text-sm leading-7 text-ink/65">{layer.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

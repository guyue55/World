export function SkeletonLayerSummary({
  layers,
}: {
  layers: Array<{ id: string; title: string; description: string }>
}) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {layers.map((layer) => (
        <div key={layer.id} className="rounded-world border border-ink/10 bg-white/45 p-5 shadow-soft">
          <p className="text-sm tracking-[0.25em] text-moss">{layer.id.toUpperCase()}</p>
          <h2 className="mt-3 text-2xl font-semibold">{layer.title}</h2>
          <p className="mt-3 leading-7 text-ink/65">{layer.description}</p>
        </div>
      ))}
    </section>
  )
}

export function AtlasStats({
  areaCount,
  publicAreaCount,
  publicNodeCount,
  areaLinkCount,
}: {
  areaCount: number
  publicAreaCount: number
  publicNodeCount: number
  areaLinkCount: number
}) {
  const items = [
    ['区域', areaCount],
    ['公开区域', publicAreaCount],
    ['公开节点', publicNodeCount],
    ['区域星线', areaLinkCount],
  ]

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map(([label, value]) => (
        <div key={label} className="rounded-2xl border border-ink/10 bg-white/45 p-5 shadow-soft">
          <p className="text-sm text-ink/50">{label}</p>
          <p className="mt-2 text-3xl font-semibold">{value}</p>
        </div>
      ))}
    </section>
  )
}

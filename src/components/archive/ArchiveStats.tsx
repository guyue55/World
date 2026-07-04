export function ArchiveStats({
  publicNodeCount,
  areaCount,
  featuredNodeCount,
  tagCount,
}: {
  publicNodeCount: number
  areaCount: number
  featuredNodeCount: number
  tagCount: number
}) {
  const items = [
    ['公开节点', publicNodeCount],
    ['世界区域', areaCount],
    ['代表节点', featuredNodeCount],
    ['标签', tagCount],
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map(([label, value]) => (
        <div key={label} className="min-w-0 rounded-2xl border border-ink/10 bg-white/45 p-5 shadow-soft">
          <p className="truncate text-sm text-ink/50">{label}</p>
          <p className="mt-2 truncate text-3xl font-semibold">{value}</p>
        </div>
      ))}
    </div>
  )
}

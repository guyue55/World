export function TimelineStats({
  publicEventCount,
  eventTypeCount,
  actorCount,
  linkedNodeCount,
  linkedAreaCount,
}: {
  publicEventCount: number
  eventTypeCount: number
  actorCount: number
  linkedNodeCount: number
  linkedAreaCount: number
}) {
  const items = [
    ['公开事件', publicEventCount],
    ['事件类型', eventTypeCount],
    ['行动者', actorCount],
    ['关联节点', linkedNodeCount],
    ['关联区域', linkedAreaCount],
  ]

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {items.map(([label, value]) => (
        <div key={label} className="min-w-0 rounded-2xl border border-ink/10 bg-white/45 p-5 shadow-soft">
          <p className="truncate text-sm text-ink/50">{label}</p>
          <p className="mt-2 truncate text-3xl font-semibold">{value}</p>
        </div>
      ))}
    </section>
  )
}

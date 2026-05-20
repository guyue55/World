import type { Area, Node, WorldEvent } from '@/lib/types'
import { getEventLinkedNames } from '@/lib/timeline'

export function WorldEventCard({
  event,
  nodes,
  areas,
}: {
  event: WorldEvent
  nodes?: Node[]
  areas?: Area[]
}) {
  const linked = getEventLinkedNames(event, nodes ?? [], areas ?? [])

  return (
    <article className="rounded-world border border-ink/10 bg-white/45 p-5 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">{event.title}</h3>
        <time className="text-sm text-ink/50">{event.date}</time>
      </div>
      <p className="mt-3 leading-7 text-ink/65">{event.description}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full bg-ink/5 px-3 py-1 text-moss">{event.type}</span>
        <span className="rounded-full bg-ink/5 px-3 py-1 text-ink/50">{event.actor ?? 'system'}</span>
        {linked.nodes.slice(0, 3).map((name) => <span key={name} className="rounded-full bg-white/65 px-3 py-1 text-ink/50">节点：{name}</span>)}
        {linked.areas.slice(0, 3).map((name) => <span key={name} className="rounded-full bg-white/65 px-3 py-1 text-ink/50">区域：{name}</span>)}
      </div>
    </article>
  )
}

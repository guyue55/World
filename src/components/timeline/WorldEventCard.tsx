import type { Area, Node, WorldEvent } from '@/lib/types'
import { formatWorldEventActor, formatWorldEventType, getEventLinkedNames } from '@/lib/timeline'

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
  const actor = event.actor ?? 'system'

  return (
    <article className="rounded-world border border-ink/10 bg-white/45 p-5 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="min-w-0 flex-1 break-words text-lg font-semibold">{event.title}</h3>
        <time className="shrink-0 text-sm text-ink/50">{event.date}</time>
      </div>
      <p className="mt-3 break-words leading-7 text-ink/65">{event.description}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <span className="shrink-0 rounded-full bg-ink/5 px-3 py-1 text-moss">{formatWorldEventType(event.type)}</span>
        <span className="shrink-0 rounded-full bg-ink/5 px-3 py-1 text-ink/50">{formatWorldEventActor(actor)}</span>
        {linked.nodes.slice(0, 3).map((name) => <span key={name} className="truncate rounded-full bg-white/65 px-3 py-1 text-ink/50 max-w-full">节点：{name}</span>)}
        {linked.areas.slice(0, 3).map((name) => <span key={name} className="truncate rounded-full bg-white/65 px-3 py-1 text-ink/50 max-w-full">区域：{name}</span>)}
      </div>
    </article>
  )
}

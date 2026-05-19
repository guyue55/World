import type { WorldEvent } from '@/lib/types'

export function WorldEventCard({ event }: { event: WorldEvent }) {
  return (
    <article className="rounded-world border border-ink/10 bg-white/45 p-5 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">{event.title}</h3>
        <time className="text-sm text-ink/50">{event.date}</time>
      </div>
      <p className="mt-3 leading-7 text-ink/65">{event.description}</p>
      <p className="mt-4 text-xs text-moss">{event.type} · {event.actor ?? 'system'}</p>
    </article>
  )
}

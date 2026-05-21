import Link from 'next/link'
import type { TimeRiverEvent } from '@/features/time-river'
export function TimeEventCard({ event }: { event: TimeRiverEvent }) { const body=<article className="rounded-[2rem] border border-white/50 bg-white/75 p-5 shadow-soft"><p className="text-xs tracking-[0.3em] text-moss">{event.type.toUpperCase()} · {event.status}</p><h3 className="mt-3 text-2xl font-semibold">{event.version}｜{event.title}</h3><p className="mt-3 text-sm leading-6 text-ink/65">{event.description}</p></article>; return event.href ? <Link href={event.href}>{body}</Link> : body }

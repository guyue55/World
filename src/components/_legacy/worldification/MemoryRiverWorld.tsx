import { contentSeeds } from '@/features/_legacy/content-ingestion'

export function MemoryRiverWorld() {
  const events = contentSeeds.filter((seed) => seed.channel === 'time-river' || seed.channel === 'memory-graph')
  return (
    <section className="rounded-[3rem] border border-white/50 bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(212,230,226,0.68))] p-6 shadow-soft md:p-8">
      <p className="text-xs tracking-[0.34em] text-moss">MEMORY RIVER</p>
      <h2 className="mt-3 text-3xl font-semibold">时间河，而不是时间轴</h2>
      <div className="mt-8 grid gap-4">
        {events.map((event, index) => (
          <article key={event.id} className="relative rounded-[2rem] border border-white/60 bg-white/70 p-5">
            <span className="absolute -left-2 top-6 h-4 w-4 rounded-full bg-moss" />
            <p className="text-xs tracking-[0.28em] text-moss">river point {index + 1} · {event.visibility}</p>
            <h3 className="mt-3 text-xl font-semibold">{event.title}</h3>
            <p className="mt-3 text-sm leading-6 text-ink/65">{event.summary}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

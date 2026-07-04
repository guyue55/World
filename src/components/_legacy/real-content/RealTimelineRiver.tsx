import { realTimelineEvents } from '@/features/real-content-v5'

export function RealTimelineRiver() {
  return (
    <section className="rounded-[3rem] border border-white/50 bg-[linear-gradient(135deg,rgba(255,255,255,0.84),rgba(212,230,226,0.72))] p-6 shadow-soft md:p-8">
      <p className="text-xs tracking-[0.34em] text-moss">REAL TIMELINE RIVER</p>
      <h2 className="mt-3 text-3xl font-semibold">真实事件进入时间河</h2>
      <div className="mt-8 grid gap-4">
        {realTimelineEvents.map((event, index) => (
          <article key={event.id} className="relative rounded-[2rem] border border-white/60 bg-white/75 p-5">
            <span className="absolute -left-2 top-6 h-4 w-4 rounded-full bg-moss" />
            <p className="text-xs tracking-[0.28em] text-moss">{event.period} · {event.privacy} · {index + 1}</p>
            <h3 className="mt-3 text-xl font-semibold">{event.title}</h3>
            <p className="mt-3 text-sm leading-6 text-ink/65">{event.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

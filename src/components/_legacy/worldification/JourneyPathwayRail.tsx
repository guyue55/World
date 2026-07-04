import { getJourneyStops, worldJourneys } from '@/features/worldification-v4'

export function JourneyPathwayRail() {
  return (
    <section className="rounded-[3rem] border border-white/50 bg-white/75 p-6 shadow-soft md:p-8">
      <p className="text-xs tracking-[0.34em] text-moss">JOURNEY PATHWAYS</p>
      <h2 className="mt-3 text-3xl font-semibold">路径变成旅程，而不是链接集合</h2>
      <div className="mt-8 grid gap-4">
        {worldJourneys.map((journey) => (
          <article key={journey.id} className="rounded-[2rem] border border-white/60 bg-sand/55 p-5">
            <p className="text-xs tracking-[0.28em] text-moss">{journey.mood}</p>
            <h3 className="mt-3 text-2xl font-semibold">{journey.title}</h3>
            <p className="mt-3 text-sm leading-6 text-ink/65">{journey.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {getJourneyStops(journey).map((zone, index) => (
                <a key={zone.id} href={zone.route} className="rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs text-ink/65">
                  {index + 1}. {zone.title}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

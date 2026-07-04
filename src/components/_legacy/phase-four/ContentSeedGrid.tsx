import { getPhaseFourContentSeeds } from '@/lib/phase-four-content'

export function ContentSeedGrid() {
  const seeds = getPhaseFourContentSeeds()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">第一批真实内容种子</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {seeds.map((seed) => (
          <article key={seed.id} className="rounded-2xl bg-paper/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{seed.column} · {seed.type}</p>
            <h3 className="mt-3 text-xl font-semibold">{seed.title}</h3>
            <p className="mt-3 text-sm leading-7 text-ink/65">{seed.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {seed.targetSurface.map((surface) => (
                <span key={surface} className="rounded-full bg-ink/5 px-3 py-1 text-xs text-ink/60">{surface}</span>
              ))}
            </div>
            <p className="mt-4 text-xs text-moss">next: {seed.nextAction}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

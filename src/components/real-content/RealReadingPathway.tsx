import { realReadingPaths, resolveContentIds } from '@/features/real-content-v5'

export function RealReadingPathway() {
  return (
    <section className="rounded-[3rem] border border-white/50 bg-ink p-6 text-white shadow-soft md:p-8">
      <p className="text-xs tracking-[0.34em] text-white/45">REAL READING PATHS</p>
      <h2 className="mt-3 text-3xl font-semibold">真实阅读路径</h2>
      <div className="mt-8 grid gap-4">
        {realReadingPaths.map((path) => {
          const items = resolveContentIds(path.contentIds)
          return (
            <article key={path.id} className="rounded-[2rem] border border-white/15 bg-white/10 p-5">
              <p className="text-xs tracking-[0.28em] text-white/45">items: {items.length}</p>
              <h3 className="mt-3 text-xl font-semibold">{path.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">{path.intent}</p>
              <p className="mt-3 text-sm leading-6 text-white/62">下一步：{path.nextAction}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

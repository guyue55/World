import { realExhibitions, resolveContentIds } from '@/features/real-content-v5'

export function RealExhibitionRoom() {
  return (
    <section className="rounded-[3rem] border border-white/50 bg-white/80 p-6 shadow-soft md:p-8">
      <p className="text-xs tracking-[0.34em] text-moss">REAL EXHIBITIONS</p>
      <h2 className="mt-3 text-3xl font-semibold">主题展览开始有真实内容</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {realExhibitions.map((exhibition) => {
          const items = resolveContentIds(exhibition.contentIds)
          return (
            <article key={exhibition.id} className="rounded-[2rem] border border-white/60 bg-sand/60 p-5">
              <p className="text-xs tracking-[0.28em] text-moss">{exhibition.status}</p>
              <h3 className="mt-3 text-xl font-semibold">{exhibition.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/65">{exhibition.theme}</p>
              <p className="mt-4 text-xs text-ink/45">content items: {items.length}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

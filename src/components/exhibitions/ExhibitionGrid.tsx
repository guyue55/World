import { getThemeExhibitions } from '@/lib/theme-exhibitions'

export function ExhibitionGrid() {
  const exhibitions = getThemeExhibitions()

  return (
    <section className="grid gap-4 md:grid-cols-2">
      {exhibitions.map((item) => (
        <article key={item.id} className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs uppercase tracking-[0.25em] text-moss">{item.visibility}</p>
            {item.visibility === 'planning-only' ? <span className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-800">不进入公开导航</span> : null}
          </div>
          <h2 className="mt-4 text-2xl font-semibold">{item.title}</h2>
          <p className="mt-3 leading-7 text-ink/65">{item.theme}</p>
          <div className="mt-5 rounded-2xl bg-paper/70 p-4">
            <p className="text-sm font-semibold">来源路由</p>
            <p className="mt-2 text-sm leading-6 text-ink/60">{item.sourceRoutes.join(' · ')}</p>
          </div>
          <div className="mt-3 rounded-2xl bg-paper/70 p-4">
            <p className="text-sm font-semibold">输出形式</p>
            <p className="mt-2 text-sm leading-6 text-ink/60">{item.output.join(' · ')}</p>
          </div>
        </article>
      ))}
    </section>
  )
}

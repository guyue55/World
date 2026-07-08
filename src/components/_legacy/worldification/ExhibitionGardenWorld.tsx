import { themeModes } from '@/features/_legacy/theme-system'

export function ExhibitionGardenWorld() {
  return (
    <section className="rounded-[3rem] border border-white/50 bg-[linear-gradient(135deg,rgba(255,255,255,0.86),rgba(234,223,201,0.78))] p-6 shadow-soft md:p-8">
      <p className="text-xs tracking-[0.34em] text-moss">EXHIBITION GARDEN</p>
      <h2 className="mt-3 text-3xl font-semibold">主题展览花园，而不是分类页</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {themeModes.map((theme) => (
          <article key={theme.id} className={`rounded-[2rem] border border-white/60 p-5 shadow-soft ${theme.surfaceClass}`}>
            <p className={`text-xs tracking-[0.28em] ${theme.accentClass}`}>{theme.layout}</p>
            <h3 className="mt-3 text-xl font-semibold">{theme.title}</h3>
            <p className="mt-3 text-sm leading-6 opacity-70">{theme.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

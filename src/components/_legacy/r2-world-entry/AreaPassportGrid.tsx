import { r2AreaPassports } from '@/features/r2-world-experience'

export function AreaPassportGrid() {
  return (
    <section className="rounded-[2.5rem] border border-white/70 bg-white/80 p-6 shadow-soft">
      <p className="text-xs uppercase tracking-[0.28em] text-ink/45">Area Passports</p>
      <h2 className="mt-3 text-3xl font-semibold">诗意命名必须配现实解释</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {r2AreaPassports.map((area) => (
          <article key={area.id} className="rounded-3xl bg-ink/5 p-5">
            <p className="text-sm text-ink/50">{area.realName} · {area.defaultVisibility}</p>
            <h3 className="mt-2 text-xl font-semibold">{area.worldName}</h3>
            <p className="mt-3 leading-7 text-ink/65">{area.purpose}</p>
            <p className="mt-4 text-xs text-ink/45">进入：{area.entry} · 退出：{area.exit}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

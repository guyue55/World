import { r2ProgressiveDisclosure } from '@/features/r2-world-experience'

export function WorldGatewayPanel() {
  return (
    <section className="rounded-[2.5rem] border border-white/70 bg-white/80 p-6 shadow-soft">
      <p className="text-xs uppercase tracking-[0.28em] text-ink/45">Progressive Disclosure</p>
      <h2 className="mt-3 text-3xl font-semibold">入口清澈，深处浩瀚</h2>
      <p className="mt-3 max-w-3xl leading-7 text-ink/65">{r2ProgressiveDisclosure.rule}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {r2ProgressiveDisclosure.levels.map((level) => (
          <article key={level.level} className="rounded-3xl bg-ink/5 p-5">
            <p className="text-sm text-ink/50">{level.level} · {level.visibility}</p>
            <h3 className="mt-2 text-xl font-semibold">{level.name}</h3>
            <p className="mt-3 text-sm leading-6 text-ink/60">{level.areas.join(' / ')}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

import { getPhaseFourContentSummary } from '@/lib/phase-four-content'

export function PhaseFourHero() {
  const summary = getPhaseFourContentSummary()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-8 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">PHASE FOUR</p>
      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">真实内容生长与运营</h1>
      <p className="mt-5 max-w-3xl leading-8 text-ink/70">
        {summary.theme} 第四阶段的重点不再是继续堆门禁，而是让公开世界拥有真实内容、
        真实栏目、真实展览和可持续运营节奏。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-5">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">重点</p><p className="mt-2 text-2xl font-semibold">{summary.focus}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">种子</p><p className="mt-2 text-2xl font-semibold">{summary.seedCount}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">公开</p><p className="mt-2 text-2xl font-semibold">{summary.publicSeeds}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">栏目</p><p className="mt-2 text-2xl font-semibold">{summary.columns}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">节奏</p><p className="mt-2 text-2xl font-semibold">{summary.cadenceWeeks}</p></div>
      </div>
    </section>
  )
}

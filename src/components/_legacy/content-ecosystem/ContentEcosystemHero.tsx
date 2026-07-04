import { getPhaseNineContentSummary } from '@/lib/phase-nine-content'

export function ContentEcosystemHero() {
  const summary = getPhaseNineContentSummary()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-8 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">CONTENT ECOSYSTEM</p>
      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">真实内容生态</h1>
      <p className="mt-5 max-w-3xl leading-8 text-ink/70">
        第九阶段把古月浮屿从系统建设推进到长期表达：主题支柱、内容日历、栏目运营和传播渠道共同形成稳定节奏。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">publicationReady</p><p className="mt-2 text-2xl font-semibold">{String(summary.publicationReady)}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">主题支柱</p><p className="mt-2 text-2xl font-semibold">{summary.pillars}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">栏目</p><p className="mt-2 text-2xl font-semibold">{summary.columns}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">渠道</p><p className="mt-2 text-2xl font-semibold">{summary.channels}</p></div>
      </div>
    </section>
  )
}

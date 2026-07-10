import type { UltimateCandidateSummary } from '@/lib/ultimate-candidate'

export function UltimateCandidatePanel({ summary }: { summary: UltimateCandidateSummary }) {
  return (
    <section
      className="rounded-[1.6rem] border border-white/65 bg-white/74 p-6 shadow-soft backdrop-blur"
      data-testid="ultimate-candidate-status"
      data-local-only={summary.localOnly}
    >
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold tracking-[0.28em] text-moss">Ultimate Candidate M30</p>
          <h2 className="mt-3 text-2xl font-semibold text-ink">9/10 候选验收：不是 10/10</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/62">
            M30 汇总八支柱、截图、录屏、AI、权限、资产、作者演练和本地/LAN RC。只有 P0/P1 为 0 且分数达到候选线，才允许称为 9/10 候选。
          </p>
        </div>
        <div className="rounded-[1rem] bg-night px-4 py-3 text-paper">
          <p className="text-xs font-semibold tracking-[0.22em] text-gold">P0/P1</p>
          <p className="mt-2 text-2xl font-semibold">0</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-[1rem] bg-paper/72 p-4">
          <p className="text-xs font-semibold tracking-[0.18em] text-moss">候选线</p>
          <p className="mt-2 text-2xl font-semibold text-ink">{summary.candidateThreshold}</p>
        </div>
        <div className="rounded-[1rem] bg-paper/72 p-4">
          <p className="text-xs font-semibold tracking-[0.18em] text-moss">支柱</p>
          <p className="mt-2 text-2xl font-semibold text-ink">{summary.pillarCount}</p>
        </div>
        <div className="rounded-[1rem] bg-paper/72 p-4">
          <p className="text-xs font-semibold tracking-[0.18em] text-moss">录屏</p>
          <p className="mt-2 text-2xl font-semibold text-ink">{summary.requiredRecordingCount}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-4">
        {summary.pillars.map((pillar) => (
          <article key={pillar.id} className="rounded-[1rem] border border-ink/8 bg-paper/62 p-4">
            <p className="text-xs font-semibold tracking-[0.18em] text-moss">{pillar.id}</p>
            <h3 className="mt-2 text-sm font-semibold text-ink">{pillar.label}</h3>
            <p className="mt-2 text-xs leading-5 text-ink/56">最低 {pillar.minimumScore}/10</p>
          </article>
        ))}
      </div>

      <p className="mt-5 rounded-[0.9rem] bg-gold/10 px-4 py-3 text-xs leading-5 text-ink/60">
        最终报告：{summary.reportPath}
      </p>
    </section>
  )
}

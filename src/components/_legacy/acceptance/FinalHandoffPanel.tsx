import { getFinalHandoffSummary, getNextStageReadiness, getPhaseTwoFinalCheckMatrix } from '@/lib/final-handoff'

export function FinalHandoffPanel() {
  const summary = getFinalHandoffSummary()
  const matrix = getPhaseTwoFinalCheckMatrix()
  const next = getNextStageReadiness()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">FINAL HANDOFF</p>
      <h2 className="mt-3 text-3xl font-semibold">第二阶段最终交接</h2>
      <p className="mt-3 max-w-3xl leading-8 text-ink/70">
        第二阶段体验闭环与 3 批收口补强已完成。当前可以进入后续规划或真实验证，
        但不能宣称发布级完成。
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">决策</p><p className="mt-2 text-sm font-semibold leading-6">{summary.decision}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">批次</p><p className="mt-2 text-2xl font-semibold">{summary.completedBatches}+{summary.hardeningBatches}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">检查项</p><p className="mt-2 text-2xl font-semibold">{summary.checks}</p></div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl bg-paper/70 p-4">
          <h3 className="font-semibold">最终检查矩阵</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/65">
            {matrix.checks.map((check) => <li key={check.id}>- {check.name}: {check.status}</li>)}
          </ul>
        </div>
        <div className="rounded-2xl bg-paper/70 p-4">
          <h3 className="font-semibold">后续进入线</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/65">
            {next.tracks.map((track) => <li key={track.id}>- {track.title}: {track.entryCondition}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}

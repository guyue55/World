import { getPhaseFourteenEvidenceSummary } from '@/lib/phase-fourteen-evidence'

export function EvidenceSprintHero() {
  const summary = getPhaseFourteenEvidenceSummary()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-8 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">EVIDENCE SPRINT</p>
      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">真实执行证据冲刺</h1>
      <p className="mt-5 max-w-3xl leading-8 text-ink/70">
        第十四阶段聚焦真实执行结果、阻断项、人工签收和 release-ready 转换条件。
        当前仍不伪造通过状态，blocked 与 pending 不计为 passed。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">realExecutionPassed</p><p className="mt-2 text-2xl font-semibold">{String(summary.realExecutionPassed)}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">执行项</p><p className="mt-2 text-2xl font-semibold">{summary.executionItems}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">阻断</p><p className="mt-2 text-2xl font-semibold">{summary.blockers}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">releaseReady</p><p className="mt-2 text-2xl font-semibold">{String(summary.releaseReady)}</p></div>
      </div>
    </section>
  )
}

import { getEvidenceDashboardSummary } from '@/lib/evidence-dashboard'

export function EvidenceHero() {
  const summary = getEvidenceDashboardSummary()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-8 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">REAL EVIDENCE</p>
      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">真实证据执行面板</h1>
      <p className="mt-5 max-w-3xl leading-8 text-ink/70">
        真实补证必须有一个能看见顺序、状态、阻断和下一步命令的入口。本面板只展示状态，
        不伪造执行结果，也不关闭阻断项。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-4 xl:grid-cols-8">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">区块</p><p className="mt-2 text-2xl font-semibold">{summary.sections}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">证据项</p><p className="mt-2 text-2xl font-semibold">{summary.evidenceItems}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">依赖</p><p className="mt-2 text-xs font-semibold">{summary.dependencyStatus}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">命令</p><p className="mt-2 text-xs font-semibold">{summary.captureStatus}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">反馈</p><p className="mt-2 text-xs font-semibold">{summary.feedbackStatus}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">阻断</p><p className="mt-2 text-2xl font-semibold">{summary.openBlockers}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4 md:col-span-2"><p className="text-sm text-ink/50">矩阵</p><p className="mt-2 text-xs font-semibold">{summary.matrixStatus}</p></div>
      </div>
    </section>
  )
}

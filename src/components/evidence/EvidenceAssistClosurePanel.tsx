import { getEvidenceAssistClosureSummary, getEvidenceAssistReadiness } from '@/lib/evidence-assist-closure'

export function EvidenceAssistClosurePanel() {
  const summary = getEvidenceAssistClosureSummary()
  const readiness = getEvidenceAssistReadiness()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">ASSIST CLOSURE</p>
      <h2 className="mt-3 text-3xl font-semibold">补证执行辅助线收口</h2>
      <p className="mt-3 max-w-3xl leading-8 text-ink/70">
        执行辅助线完成了证据面板、阻断关闭请求、缺陷流转队列和最终就绪矩阵。
        但 release-ready 仍由真实执行结果、缺陷复测和阻断关闭决定。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-6">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">批次</p><p className="mt-2 text-2xl font-semibold">{summary.completedBatches}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">命令</p><p className="mt-2 text-2xl font-semibold">{summary.preparedCommands}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">真实动作</p><p className="mt-2 text-2xl font-semibold">{summary.remainingRealActions}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">就绪项</p><p className="mt-2 text-2xl font-semibold">{summary.readinessItems}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">阻断</p><p className="mt-2 text-2xl font-semibold">{summary.openBlockers}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">发布</p><p className="mt-2 text-xs font-semibold">{summary.releaseDecision}</p></div>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {readiness.items.map((item) => (
          <div key={item.id} className="rounded-2xl bg-paper/70 p-4">
            <p className="font-semibold">{item.id}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-moss">{item.status}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

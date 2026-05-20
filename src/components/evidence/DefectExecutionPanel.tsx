import { getDefectExecutionQueueItems, getDefectExecutionSummary } from '@/lib/defect-execution'

export function DefectExecutionPanel() {
  const summary = getDefectExecutionSummary()
  const items = getDefectExecutionQueueItems()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">DEFECT FLOW</p>
      <h2 className="mt-3 text-3xl font-semibold">真实缺陷流转队列</h2>
      <p className="mt-3 max-w-3xl leading-8 text-ink/70">
        真实 QA、预览冒烟和性能测量发现的问题必须进入同一条缺陷流转队列。
        P0/P1 缺陷会继续阻断 release-ready。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-4 xl:grid-cols-7">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">来源</p><p className="mt-2 text-2xl font-semibold">{summary.sources}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">等级</p><p className="mt-2 text-2xl font-semibold">{summary.severity}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">状态</p><p className="mt-2 text-2xl font-semibold">{summary.allowedStatuses}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">队列</p><p className="mt-2 text-2xl font-semibold">{summary.queueItems}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">验证缺陷</p><p className="mt-2 text-2xl font-semibold">{summary.validationDefects}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">阻断</p><p className="mt-2 text-2xl font-semibold">{summary.openReleaseBlockers}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">队列状态</p><p className="mt-2 text-xs font-semibold">{summary.queueStatus}</p></div>
      </div>
      <div className="mt-6 rounded-2xl bg-paper/70 p-5 text-sm leading-7 text-ink/60">
        {items.length === 0 ? '当前队列等待真实 QA / preview / performance 证据写入。' : `${items.length} item(s) waiting.`}
      </div>
    </section>
  )
}

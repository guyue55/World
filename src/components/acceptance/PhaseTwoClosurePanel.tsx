import { getPhaseTwoClosureSummary } from '@/lib/phase-two-closure'

export function PhaseTwoClosurePanel() {
  const summary = getPhaseTwoClosureSummary()
  const items = [
    ['阶段进度', summary.stageProgress],
    ['收口判断', summary.decision],
    ['完成批次', String(summary.completedBatchCount)],
    ['产品化路由', String(summary.routeCount)],
    ['lint 状态', summary.lintStatus],
    ['待外部证据', String(summary.remainingEvidenceCount)],
  ]

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">PHASE TWO CLOSURE</p>
      <h2 className="mt-3 text-3xl font-semibold">第二阶段收口报告</h2>
      <p className="mt-3 max-w-3xl leading-8 text-ink/70">
        本阶段体验闭环已完成，但真实 lint、typecheck、build、浏览器 QA、预览冒烟和性能实测仍需在真实项目环境执行并回写证据。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {items.map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-paper/70 p-4">
            <p className="text-sm text-ink/50">{label}</p>
            <p className="mt-2 text-sm font-semibold leading-6">{value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

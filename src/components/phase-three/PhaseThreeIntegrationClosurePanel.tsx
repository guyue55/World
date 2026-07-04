import { getPhaseThreeIntegrationClosureSummary, getPhaseThreeIntegrationReadiness } from '@/lib/phase-three-integration-closure'

export function PhaseThreeIntegrationClosurePanel() {
  const summary = getPhaseThreeIntegrationClosureSummary()
  const readiness = getPhaseThreeIntegrationReadiness()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">INTEGRATION CLOSURE</p>
      <h2 className="mt-3 text-3xl font-semibold">第三阶段体验整合线收口</h2>
      <p className="mt-3 max-w-3xl leading-8 text-ink/70">
        体验整合线完成了新增路由的导航、QA 矩阵和入口聚合。但这只代表静态结构通过，
        不代表真实浏览器 QA 或 release-ready 通过。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-6">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">批次</p><p className="mt-2 text-2xl font-semibold">{summary.completedBatches}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">路由</p><p className="mt-2 text-2xl font-semibold">{summary.integratedRoutes}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">待证据</p><p className="mt-2 text-2xl font-semibold">{summary.pendingEvidence}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">就绪项</p><p className="mt-2 text-2xl font-semibold">{summary.readinessItems}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">阻断</p><p className="mt-2 text-2xl font-semibold">{summary.openReleaseBlockers}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">发布</p><p className="mt-2 text-sm font-semibold">{summary.releaseDecision}</p></div>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
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

import { getPhaseThreeQaSummary } from '@/lib/phase-three-qa'

export function PhaseThreeQaPanel() {
  const summary = getPhaseThreeQaSummary()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">PHASE THREE QA</p>
      <h2 className="mt-3 text-3xl font-semibold">新增路由 QA 扩展</h2>
      <p className="mt-3 max-w-3xl leading-8 text-ink/70">
        新增路由已经进入浏览器 QA 扩展矩阵，但仍是 pending-real-browser-qa。
        静态矩阵扩展不等于真实 QA 通过。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">新增路由</p><p className="mt-2 text-2xl font-semibold">{summary.newRoutes}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">视口</p><p className="mt-2 text-2xl font-semibold">{summary.requiredViewports}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">检查点</p><p className="mt-2 text-2xl font-semibold">{summary.interactionFocus}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">矩阵项</p><p className="mt-2 text-2xl font-semibold">{summary.matrixItems}</p></div>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {summary.newRouteCoverage.map((item) => (
          <div key={item.route} className="rounded-2xl bg-paper/70 p-4">
            <p className="font-semibold">{item.route}</p>
            <p className="mt-2 text-sm text-ink/60">覆盖视口：{item.coverageCount}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

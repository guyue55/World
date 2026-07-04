import { getPhaseThreeImplementationRoutes, getPhaseThreeImplementationSummary } from '@/lib/phase-three-implementation'

export function PhaseThreeImplementationClosurePanel() {
  const summary = getPhaseThreeImplementationSummary()
  const routes = getPhaseThreeImplementationRoutes()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">IMPLEMENTATION CLOSURE</p>
      <h2 className="mt-3 text-3xl font-semibold">第三阶段实现线收口</h2>
      <p className="mt-3 max-w-3xl leading-8 text-ink/70">
        第三阶段实现线完成了三个静态原型入口，但 release-ready 仍被真实证据阻断。
        新增路由必须进入真实浏览器 QA 后才能判断体验通过。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-5">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">新增路由</p><p className="mt-2 text-2xl font-semibold">{summary.implementedRoutes}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">批次</p><p className="mt-2 text-2xl font-semibold">{summary.implementedBatches}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">边界</p><p className="mt-2 text-2xl font-semibold">{summary.preservedBoundaries}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">阻断</p><p className="mt-2 text-2xl font-semibold">{summary.openReleaseBlockers}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">发布</p><p className="mt-2 text-sm font-semibold">{summary.releaseDecision}</p></div>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {routes.routes.map((item) => (
          <div key={item.route} className="rounded-2xl bg-paper/70 p-4">
            <p className="font-semibold">{item.route}</p>
            <p className="mt-2 text-sm text-ink/60">{item.feature}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-moss">{item.qaStatus}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

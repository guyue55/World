import { getBrowserQaRouteCoverage, getBrowserQaSummary } from '@/lib/_legacy/browser-qa'

export function BrowserQaMatrixPanel() {
  const summary = getBrowserQaSummary()
  const coverage = getBrowserQaRouteCoverage()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">BROWSER QA</p>
      <h2 className="mt-3 text-3xl font-semibold">浏览器 QA 矩阵</h2>
      <p className="mt-3 max-w-3xl leading-8 text-ink/70">
        浏览器 QA 必须覆盖真实视口、真实路由和真实交互。当前矩阵已准备好，
        但只有真实浏览器执行后才能将结果标记为通过。
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-5">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">视口</p><p className="mt-2 text-2xl font-semibold">{summary.viewports}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">核心路由</p><p className="mt-2 text-2xl font-semibold">{summary.requiredRoutes}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">检查点</p><p className="mt-2 text-2xl font-semibold">{summary.interactionFocus}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">路由检查</p><p className="mt-2 text-2xl font-semibold">{summary.routeChecks}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">缺陷</p><p className="mt-2 text-2xl font-semibold">{summary.defects}</p></div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {coverage.routes.map((route) => (
          <div key={route.route} className="rounded-2xl bg-paper/70 p-4">
            <p className="font-semibold">{route.route}</p>
            <p className="mt-2 text-sm text-ink/55">{route.coverageCount} 个视口：{route.viewports.join(', ')}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

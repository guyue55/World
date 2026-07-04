import {
  getLargeContentStrategy,
  getPerformanceMetricsModel,
  getPerformanceRegressionGuard,
  getRoutePerformanceProfiles,
  getSmoothnessAuditChecklist,
} from '@/lib/performance-regression'

export function PerformanceRegressionPanel() {
  const metrics = getPerformanceMetricsModel()
  const routes = getRoutePerformanceProfiles()
  const smoothness = getSmoothnessAuditChecklist()
  const largeContent = getLargeContentStrategy()
  const guard = getPerformanceRegressionGuard()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">PERFORMANCE REGRESSION</p>
      <h2 className="mt-3 text-3xl font-semibold">性能回归守门</h2>
      <p className="mt-3 leading-8 text-ink/70">
        性能必须可度量，才能在未来扩展中不退化。
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">指标</p>
          <p className="mt-2 text-3xl font-semibold">{metrics.metrics.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">页面档案</p>
          <p className="mt-2 text-3xl font-semibold">{routes.profiles.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">流畅审计</p>
          <p className="mt-2 text-3xl font-semibold">{smoothness.auditItems.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">内容阶段</p>
          <p className="mt-2 text-3xl font-semibold">{largeContent.growthStages.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">守门项</p>
          <p className="mt-2 text-3xl font-semibold">{guard.guards.length}</p>
        </div>
      </div>
    </section>
  )
}

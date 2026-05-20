import { getPhaseThreeIntegratedRoutes, getPhaseThreeRouteIntegrationSummary } from '@/lib/phase-three-route-integration'

export function PhaseThreeRoutePanel() {
  const summary = getPhaseThreeRouteIntegrationSummary()
  const routes = getPhaseThreeIntegratedRoutes()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">ROUTE INTEGRATION</p>
      <h2 className="mt-3 text-3xl font-semibold">第三阶段路由整合</h2>
      <p className="mt-3 max-w-3xl leading-8 text-ink/70">
        新增原型路由已经纳入世界整合面板，但仍保持 static-prototype 标记。
        导航可见不代表浏览器 QA 通过，也不代表 release-ready。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">整合路由</p><p className="mt-2 text-2xl font-semibold">{summary.integratedRoutes}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">登记路由</p><p className="mt-2 text-2xl font-semibold">{summary.registeredRoutes}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">原型</p><p className="mt-2 text-2xl font-semibold">{summary.staticPrototypeRoutes}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">发布</p><p className="mt-2 text-sm font-semibold">{summary.releaseDecision}</p></div>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {routes.map((route) => (
          <a key={route.route} href={route.route} className="rounded-2xl bg-paper/70 p-4 transition hover:-translate-y-0.5 hover:bg-white">
            <p className="font-semibold">{route.title}</p>
            <p className="mt-2 text-sm text-ink/60">{route.route}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-moss">{route.releaseStatus}</p>
          </a>
        ))}
      </div>
    </section>
  )
}

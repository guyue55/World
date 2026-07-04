import { getPhaseThreeEntryHubSummary } from '@/lib/phase-three-entry-hub'

export function PhaseThreeEntryHero() {
  const summary = getPhaseThreeEntryHubSummary()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-8 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">PHASE THREE HUB</p>
      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">第三阶段入口</h1>
      <p className="mt-5 max-w-3xl leading-8 text-ink/70">
        第三阶段原型入口被组织在这里：主题展览、AI 建议工作台与导出中心。
        它们是静态原型，不是生产发布结论。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">入口</p><p className="mt-2 text-2xl font-semibold">{summary.entries}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">警示</p><p className="mt-2 text-2xl font-semibold">{summary.warnings}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">实现路由</p><p className="mt-2 text-2xl font-semibold">{summary.implementedRoutes}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">发布</p><p className="mt-2 text-sm font-semibold">{summary.releaseDecision}</p></div>
      </div>
    </section>
  )
}

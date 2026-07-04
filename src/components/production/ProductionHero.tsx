import { getPhaseEightProductionSummary } from '@/lib/phase-eight-production'

export function ProductionHero() {
  const summary = getPhaseEightProductionSummary()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-8 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">PRODUCTION RELEASE</p>
      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">真实生产发布</h1>
      <p className="mt-5 max-w-3xl leading-8 text-ink/70">
        第八阶段面向真实生产环境。当前看板只记录部署准备、域名 HTTPS CDN、生产 smoke 与签收状态，
        不伪造生产上线结果。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">productionLive</p><p className="mt-2 text-2xl font-semibold">{String(summary.productionLive)}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">环境</p><p className="mt-2 text-2xl font-semibold">{summary.environments}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">部署项</p><p className="mt-2 text-2xl font-semibold">{summary.checklistItems}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">待完成</p><p className="mt-2 text-2xl font-semibold">{summary.pendingItems}</p></div>
      </div>
    </section>
  )
}

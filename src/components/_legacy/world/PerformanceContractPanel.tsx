import {
  getInteractionSmoothnessContract,
  getLoadingStrategy,
  getPerformanceBudget,
  getRenderingStrategy,
} from '@/lib/performance-contracts'

export function PerformanceContractPanel() {
  const budget = getPerformanceBudget()
  const rendering = getRenderingStrategy()
  const loading = getLoadingStrategy()
  const smoothness = getInteractionSmoothnessContract()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">PERFORMANCE</p>
      <h2 className="mt-3 text-3xl font-semibold">性能与流畅度骨架</h2>
      <p className="mt-3 leading-8 text-ink/70">
        世界可以宏大，但首次进入必须轻、快、稳。
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">性能预算</p>
          <p className="mt-2 text-3xl font-semibold">{budget.budgets.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">渲染层</p>
          <p className="mt-2 text-3xl font-semibold">{rendering.layers.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">加载策略</p>
          <p className="mt-2 text-3xl font-semibold">{loading.strategies.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">流畅规则</p>
          <p className="mt-2 text-3xl font-semibold">{smoothness.rules.length}</p>
        </div>
      </div>
    </section>
  )
}

import {
  getCacheStrategy,
  getCriticalPathContract,
  getRuntimeSplitContract,
  getStaticAssetPolicy,
} from '@/lib/performance-implementation'

export function PerformanceImplementationPanel() {
  const critical = getCriticalPathContract()
  const assets = getStaticAssetPolicy()
  const cache = getCacheStrategy()
  const split = getRuntimeSplitContract()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">PERFORMANCE IMPLEMENTATION</p>
      <h2 className="mt-3 text-3xl font-semibold">性能实现边界</h2>
      <p className="mt-3 leading-8 text-ink/70">
        首屏只承载世界入口，不承载完整宇宙重量。
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">关键路径</p>
          <p className="mt-2 text-3xl font-semibold">{critical.routes.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">资源策略</p>
          <p className="mt-2 text-3xl font-semibold">{assets.assetKinds.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">缓存策略</p>
          <p className="mt-2 text-3xl font-semibold">{cache.strategies.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">拆分目标</p>
          <p className="mt-2 text-3xl font-semibold">{split.splitTargets.length}</p>
        </div>
      </div>
    </section>
  )
}

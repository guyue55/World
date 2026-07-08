import {
  getContentProductizationBaseline,
  getCoverStrategy,
  getProjectionDensityStrategy,
  getSeedContentQualityGate,
} from '@/lib/content-productization'

export function ContentProductizationPanel() {
  const baseline = getContentProductizationBaseline()
  const covers = getCoverStrategy()
  const density = getProjectionDensityStrategy()
  const quality = getSeedContentQualityGate()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">CONTENT PRODUCTIZATION</p>
      <h2 className="mt-3 text-3xl font-semibold">内容产品化骨架</h2>
      <p className="mt-3 leading-8 text-ink/70">
        首页不是数据堆叠，而是世界入口的第一次说明。
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">首页板块</p>
          <p className="mt-2 text-3xl font-semibold">{baseline.homeSections.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">封面策略</p>
          <p className="mt-2 text-3xl font-semibold">{covers.coverKinds.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">密度路由</p>
          <p className="mt-2 text-3xl font-semibold">{density.routes.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">质量门槛</p>
          <p className="mt-2 text-3xl font-semibold">{quality.qualityGates.length}</p>
        </div>
      </div>
    </section>
  )
}

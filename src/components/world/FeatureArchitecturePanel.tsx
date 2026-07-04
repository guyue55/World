import {
  getDataFlowContract,
  getFeatureModuleContract,
  getPageCompositionContract,
  getScalabilityPartition,
} from '@/lib/feature-architecture'

export function FeatureArchitecturePanel() {
  const pages = getPageCompositionContract()
  const features = getFeatureModuleContract()
  const flow = getDataFlowContract()
  const partitions = getScalabilityPartition()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">FEATURE ARCHITECTURE</p>
      <h2 className="mt-3 text-3xl font-semibold">页面化与特性模块骨架</h2>
      <p className="mt-3 leading-8 text-ink/70">
        特性模块按领域聚合，而不是按临时页面堆放。
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">页面类型</p>
          <p className="mt-2 text-3xl font-semibold">{pages.pageKinds.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">特性模块</p>
          <p className="mt-2 text-3xl font-semibold">{features.featureModules.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">数据流</p>
          <p className="mt-2 text-3xl font-semibold">{flow.flow.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">扩展分区</p>
          <p className="mt-2 text-3xl font-semibold">{partitions.partitions.length}</p>
        </div>
      </div>
    </section>
  )
}

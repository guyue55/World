import Link from 'next/link'

export function HomeStatusSummary({
  publicNodeCount,
  areaCount,
  pathCount,
}: {
  publicNodeCount: number
  areaCount: number
  pathCount: number
}) {
  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm tracking-[0.35em] text-moss">LOW LIGHT STATUS</p>
          <h2 className="mt-3 text-3xl font-semibold">世界已能独立运行，正在等待真实验收</h2>
          <p className="mt-4 leading-8 text-ink/70">
            第二阶段已经开启，但第一阶段完成仍由真实构建、浏览器 QA、性能实测和预览部署证据决定。
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-paper/70 p-5">
            <p className="text-sm text-ink/50">公开节点</p>
            <p className="mt-2 text-3xl font-semibold">{publicNodeCount}</p>
          </div>
          <div className="rounded-2xl bg-paper/70 p-5">
            <p className="text-sm text-ink/50">世界区域</p>
            <p className="mt-2 text-3xl font-semibold">{areaCount}</p>
          </div>
          <div className="rounded-2xl bg-paper/70 p-5">
            <p className="text-sm text-ink/50">导览路径</p>
            <p className="mt-2 text-3xl font-semibold">{pathCount}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link className="rounded-full border border-ink/15 bg-white/50 px-5 py-3 text-sm" href="/status">查看状态</Link>
        <Link className="rounded-full border border-ink/15 bg-white/50 px-5 py-3 text-sm" href="/skeleton">查看骨架</Link>
      </div>
    </section>
  )
}

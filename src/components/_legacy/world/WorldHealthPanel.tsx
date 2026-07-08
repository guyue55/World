import type { WorldHealth } from '@/lib/world-health'

const labels: Array<[keyof WorldHealth, string]> = [
  ['areaCount', '区域'],
  ['nodeCount', '全部节点'],
  ['publicNodeCount', '公开节点'],
  ['relationCount', '星线关系'],
  ['pathCount', '精选路径'],
  ['eventCount', '世界事件'],
  ['nodesWithoutSummary', '缺摘要'],
  ['publicNodesWithoutContent', '缺正文'],
]

export function WorldHealthPanel({ health }: { health: WorldHealth }) {
  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm tracking-[0.3em] text-moss">WORLD HEALTH</p>
          <h1 className="mt-3 text-4xl font-semibold">世界健康度</h1>
        </div>
        <span className="rounded-full bg-ink px-4 py-2 text-sm text-paper">{health.status}</span>
      </div>
      <div className="mt-8 grid gap-3 md:grid-cols-4">
        {labels.map(([key, label]) => (
          <div key={key} className="rounded-2xl border border-ink/10 bg-white/50 p-4">
            <p className="text-sm text-ink/50">{label}</p>
            <p className="mt-2 text-3xl font-semibold">{health[key]}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

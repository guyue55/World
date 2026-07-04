import Link from 'next/link'
import type { Area, Node, Path } from '@/lib/types'

const anchors = [
  '我在哪里',
  '这里是什么',
  '我能做什么',
  '我能去哪',
  '如何回去',
  '如何查找',
  '谁能看到',
]

export function ProductWorldCompass({
  areas,
  nodes,
  paths,
}: {
  areas: Area[]
  nodes: Node[]
  paths: Path[]
}) {
  const publicAreas = areas.filter((area) => area.level === 1)
  const contentNodes = nodes.filter((node) => Boolean(node.contentPath))
  const representativeNodes = nodes.filter((node) => node.featured?.representative)
  const firstPath = paths.find((path) => path.id === 'eight-minute-world') ?? paths.find((path) => path.audience === 'first-time')

  const metrics = [
    { label: '公开区域', value: publicAreas.length, note: '入口保持少而清晰' },
    { label: '公开节点', value: nodes.length, note: '真实内容继续补厚' },
    { label: '有正文节点', value: contentNodes.length, note: '避免只有产品壳' },
    { label: '代表节点', value: representativeNodes.length, note: '适合第一次进入' },
  ]

  return (
    <section className="grid gap-5 lg:grid-cols-[1fr_0.95fr]">
      <div className="rounded-[2rem] border border-white/65 bg-white/76 p-7 shadow-soft backdrop-blur md:p-8">
        <p className="text-xs font-semibold tracking-[0.35em] text-moss">WORLD COMPASS</p>
        <h2 className="mt-3 break-words text-3xl font-semibold text-ink">反迷路罗盘</h2>
        <p className="mt-3 max-w-2xl line-clamp-3 text-sm leading-7 text-ink/64">
          世界可以很大，但每个公开页面都要回答七个问题。入口只给方向，深处再逐层展开。
        </p>
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          {anchors.map((anchor) => (
            <div key={anchor} className="rounded-2xl bg-paper/70 px-4 py-3 text-sm font-medium text-ink/70">
              {anchor}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/65 bg-night p-7 text-paper shadow-soft md:p-8">
        <p className="text-xs font-semibold tracking-[0.35em] text-gold">WORLD DENSITY</p>
        <h2 className="mt-3 text-3xl font-semibold">世界密度</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {metrics.map((metric) => (
            <div key={metric.label} className="min-w-0 rounded-2xl border border-white/10 bg-white/8 p-4">
              <p className="truncate text-3xl font-semibold text-paper">{metric.value}</p>
              <p className="mt-1 truncate text-sm font-semibold text-paper/82">{metric.label}</p>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-paper/55">{metric.note}</p>
            </div>
          ))}
        </div>
        {firstPath && (
          <Link href={`/paths/${firstPath.id}`} className="mt-6 inline-flex rounded-full bg-gold px-5 py-3 text-sm font-semibold text-night transition hover:-translate-y-0.5">
            走 8 分钟路径 →
          </Link>
        )}
      </div>
    </section>
  )
}

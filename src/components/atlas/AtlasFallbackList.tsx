import Link from 'next/link'
import type { Area, Node } from '@/lib/types'
import { getAtlasAreaRows } from '@/lib/atlas'

export function AtlasFallbackList({ areas, nodes }: { areas: Area[]; nodes: Node[] }) {
  const rows = getAtlasAreaRows(areas, nodes)

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">LINEAR FALLBACK</p>
      <h2 className="mt-3 text-3xl font-semibold">线性入口</h2>
      <p className="mt-3 max-w-2xl leading-8 text-ink/70">
        当空间地图不适合阅读时，可以从这里按列表进入每个区域。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {rows.map((row) => (
          <Link
            key={row.area.id}
            href={`#${row.area.id}-nodes`}
            className="rounded-2xl bg-paper/70 p-4 transition hover:-translate-y-1 hover:bg-white"
          >
            <p className="text-2xl">{row.area.icon ?? '✦'}</p>
            <h3 className="mt-3 font-semibold">{row.area.worldName}</h3>
            <p className="mt-1 text-sm text-ink/50">{row.publicNodeCount} 个公开节点</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

import type { Area, Node } from '@/lib/types'
import { getAtlasAreaRows } from '@/lib/atlas'
import { AreaCard } from './AreaCard'

const positions: Record<string, string> = {
  origin: 'md:col-start-2 md:row-start-1',
  tech: 'md:col-start-1 md:row-start-2',
  workshop: 'md:col-start-3 md:row-start-2',
  fragments: 'md:col-start-2 md:row-start-2',
  memory: 'md:col-start-1 md:row-start-3',
  timeline: 'md:col-start-2 md:row-start-3',
  archive: 'md:col-start-3 md:row-start-3',
  lighthouse: 'md:col-start-2 md:row-start-4',
}

export function AtlasMap({ areas, nodes }: { areas: Area[]; nodes: Node[] }) {
  const rows = getAtlasAreaRows(areas, nodes)

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-white/35 p-5 shadow-soft">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,164,109,0.16),transparent_36rem)]" />
      <div className="relative mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm tracking-[0.35em] text-moss">SPATIAL MAP</p>
          <h2 className="mt-3 text-3xl font-semibold">轻量二维世界结构</h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-ink/55">
          当前阶段不用重型 3D，用稳定、可读、可扩展的空间卡片表达世界区域。
        </p>
      </div>
      <div className="relative grid gap-4 md:grid-cols-3 md:grid-rows-4">
        {rows.map((row) => (
          <div key={row.area.id} id={row.area.id} className={positions[row.area.id] ?? ''}>
            <AreaCard area={row.area} publicNodeCount={row.publicNodeCount} />
          </div>
        ))}
      </div>
    </section>
  )
}

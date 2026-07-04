import type { Area } from '@/lib/types'
import type { AreaLink } from '@/lib/atlas'

export function AtlasStarLines({ areas, links }: { areas: Area[]; links: AreaLink[] }) {
  const areaName = new Map(areas.map((area) => [area.id, area.worldName]))

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <div>
        <p className="text-sm tracking-[0.35em] text-moss">AREA STAR LINES</p>
        <h2 className="mt-3 text-3xl font-semibold">区域之间如何彼此照见</h2>
        <p className="mt-3 max-w-2xl leading-8 text-ink/70">
          这些不是复杂图谱，而是帮助理解空间结构的轻量星线。
        </p>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {links.map((link) => (
          <div key={link.id} className="rounded-2xl bg-paper/70 p-4">
            <p className="text-sm text-ink/50">{link.type}</p>
            <p className="mt-2 font-semibold">{areaName.get(link.from) ?? link.from} → {areaName.get(link.to) ?? link.to}</p>
            <p className="mt-2 text-sm leading-6 text-ink/60">{link.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

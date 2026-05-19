import type { Area } from '@/lib/types'
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

export function AtlasMap({ areas }: { areas: Area[] }) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-white/35 p-5 shadow-soft">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,164,109,0.16),transparent_36rem)]" />
      <div className="relative grid gap-4 md:grid-cols-3 md:grid-rows-4">
        {areas.map((area) => (
          <div key={area.id} id={area.id} className={positions[area.id] ?? ''}>
            <AreaCard area={area} />
          </div>
        ))}
      </div>
    </section>
  )
}

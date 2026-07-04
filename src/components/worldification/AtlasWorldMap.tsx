import { worldZones } from '@/features/worldification-v4'

export function AtlasWorldMap() {
  return (
    <section className="rounded-[3rem] border border-white/50 bg-ink p-6 text-white shadow-soft md:p-8">
      <p className="text-xs tracking-[0.34em] text-white/45">ATLAS WORLD MAP</p>
      <h2 className="mt-3 text-3xl font-semibold">世界地图，而不是导航菜单</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {worldZones.map((zone) => (
          <a key={zone.id} href={zone.route} className="rounded-[2rem] border border-white/15 bg-white/10 p-5 transition hover:bg-white/15">
            <p className="text-xs tracking-[0.28em] text-white/40">{zone.layer} · {zone.kind}</p>
            <h3 className="mt-3 text-xl font-semibold">{zone.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/65">{zone.description}</p>
          </a>
        ))}
      </div>
    </section>
  )
}

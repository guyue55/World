import { worldZones } from '@/features/worldification-v4'

export function MobileWorldDock() {
  const dockZones = worldZones.slice(0, 5)
  return (
    <nav className="sticky bottom-4 z-30 mx-auto flex max-w-3xl gap-2 overflow-x-auto rounded-full border border-white/60 bg-white/85 p-2 shadow-soft backdrop-blur">
      {dockZones.map((zone) => (
        <a key={zone.id} href={zone.route} className="shrink-0 rounded-full bg-sand/70 px-4 py-2 text-xs text-ink/70">
          {zone.title}
        </a>
      ))}
    </nav>
  )
}

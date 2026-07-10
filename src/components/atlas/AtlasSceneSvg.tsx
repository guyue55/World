import type { AtlasAreaView, AtlasLinkView } from '@/lib/scenes/build-atlas-model'

export function AtlasSceneSvg({ areas, links, focusedAreaId }: { areas: AtlasAreaView[]; links: AtlasLinkView[]; focusedAreaId: string | null }) {
  const areaById = new Map(areas.map((area) => [area.id, area]))

  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <filter id="atlas-link-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="0.55" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {links.map((link) => {
        const from = areaById.get(link.from)
        const to = areaById.get(link.to)
        if (!from || !to) return null
        const highlighted = !focusedAreaId || link.from === focusedAreaId || link.to === focusedAreaId
        return (
          <line
            key={link.id}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            vectorEffect="non-scaling-stroke"
            stroke={highlighted ? '#f0d28d' : '#8ba4a5'}
            strokeWidth={highlighted ? 0.22 : 0.1}
            strokeDasharray={highlighted ? '0' : '1.2 1.5'}
            opacity={highlighted ? 0.78 : 0.22}
            filter={highlighted ? 'url(#atlas-link-glow)' : undefined}
          />
        )
      })}
      {areas.map((area) => (
        <g key={area.id} opacity={focusedAreaId && focusedAreaId !== area.id ? 0.3 : 0.85}>
          <circle cx={area.x} cy={area.y} r={area.radius + 1.4} fill="none" stroke={area.color} strokeWidth="0.12" strokeDasharray="0.8 1.2" />
          <circle cx={area.x} cy={area.y} r={area.radius * 0.48} fill={area.color} opacity="0.09" />
        </g>
      ))}
    </svg>
  )
}

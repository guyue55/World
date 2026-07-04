'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { interactiveRoutes } from './InteractiveUniverseEngine'

export function ObservationSearchPanel() {
  const [query, setQuery] = useState('')
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return interactiveRoutes().slice(0, 5)
    return interactiveRoutes().filter((route) => `${route.worldName} ${route.realName} ${route.scene} ${route.actions.join(' ')}`.toLowerCase().includes(q)).slice(0, 6)
  }, [query])

  return (
    <div className="fixed right-4 top-[27rem] z-[44] hidden w-[22rem] rounded-[1.75rem] border border-white/45 bg-white/55 p-4 text-ink shadow-soft backdrop-blur 2xl:block">
      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/40">Observation</p>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="观测地图、时间河、灯塔..."
        className="mt-3 w-full rounded-full border border-white/70 bg-white/70 px-4 py-2 text-xs outline-none focus:border-gold/50"
      />
      <div className="mt-3 grid gap-2">
        {results.map((route) => (
          <Link key={route.match} href={route.match === '*' ? '/atlas' : route.match} className="rounded-2xl bg-white/65 p-3 transition hover:-translate-y-0.5">
            <p className="text-sm font-semibold">{route.worldName}</p>
            <p className="mt-1 text-xs text-ink/52">{route.realName} · {route.ritual}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

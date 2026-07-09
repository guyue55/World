'use client'

import Link from 'next/link'
import { useRef, useMemo, useState } from 'react'
import type { PathsDirectorySurface, PathsDirectoryPathSignal } from '@/lib/public-world-surfaces'
import { useGsapEntrance } from '@/components/world/useGsapEntrance'

function DynamicPathCard({ path }: { path: PathsDirectoryPathSignal }) {
  return (
    <Link
      href={path.href}
      data-gsap-reveal
      className="block min-w-0 rounded-[1.6rem] border border-ink/10 bg-white/45 p-5 shadow-soft transition hover:-translate-y-1 hover:bg-white/70"
    >
      <p className="truncate text-xs font-semibold tracking-[0.25em] text-moss">{path.audienceLabel}</p>
      <h3 className="mt-4 truncate text-xl font-semibold">{path.title}</h3>
      <p className="mt-3 line-clamp-3 leading-7 text-ink/65">{path.description}</p>
      <div className="mt-5 grid gap-2 text-sm text-ink/50">
        <p className="truncate">{path.nodeCount} 个节点 · 约 {path.estimatedMinutes} 分钟</p>
        {path.entryNodeTitle && <p className="truncate">起点：{path.entryNodeTitle}</p>}
      </div>
    </Link>
  )
}

export function PathsDynamicDirectory({ surface }: { surface: PathsDirectorySurface }) {
  const containerRef = useRef<HTMLDivElement>(null)
  useGsapEntrance(containerRef, true)
  
  const [activeAudience, setActiveAudience] = useState(surface.audiences[0]?.audience)
  const activePaths = useMemo(() => surface.paths.filter(p => p.audience === activeAudience), [surface.paths, activeAudience])

  return (
    <div ref={containerRef} className="space-y-10">
      <section data-gsap-reveal className="grid gap-4 rounded-[2rem] border border-white/65 bg-white/74 p-6 shadow-soft backdrop-blur md:grid-cols-3 md:p-8">
        {surface.metrics.map((metric) => (
          <div key={metric.label}>
            <p className="text-xs font-semibold tracking-[0.32em] text-moss">{metric.label}</p>
            <h2 className="mt-3 text-2xl font-semibold text-ink">{metric.value}</h2>
            <p className="mt-3 text-sm leading-7 text-ink/62">{metric.note}</p>
          </div>
        ))}
      </section>

      <div className="space-y-6">
        <div role="tablist" aria-label="路径人群筛选" className="flex flex-wrap gap-2">
          {surface.audiences.map((item) => {
            const selected = item.audience === activeAudience
            return (
              <button
                key={item.audience}
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveAudience(item.audience)}
                className={`rounded-full px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 ${
                  selected ? 'bg-ink text-paper shadow-soft' : 'border border-ink/10 bg-white/45 text-ink/70 hover:bg-white/70'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {activePaths.map((path) => (
            <DynamicPathCard key={path.id} path={path} />
          ))}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Clock, Orbit, Sparkles } from 'lucide-react'
import type { NodeOpeningSurface } from '@/lib/public-world-surfaces'
import { useWorldRuntime } from '@/components/world/WorldRuntimeProvider'
import { useGsapEntrance } from '@/components/world/useGsapEntrance'

export function NodeOpeningRitual({ surface }: { surface: NodeOpeningSurface }) {
  const rootRef = useRef<HTMLElement | null>(null)
  const runtime = useWorldRuntime()
  const shouldMove = !runtime.reducedMotion
  useGsapEntrance(rootRef, shouldMove, '[data-gsap-reveal]', 'focus')

  const facts = [
    { icon: Orbit, label: surface.areaLabel, caption: '所在星域' },
    { icon: BookOpen, label: surface.lifeStageLabel, caption: '生命阶段' },
    { icon: Clock, label: surface.readingLabel, caption: '阅读节奏' },
  ]

  return (
    <section ref={rootRef} className="relative overflow-hidden rounded-[1.65rem] border border-white/65 bg-white/72 p-5 shadow-soft backdrop-blur sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(189,207,168,0.22),transparent_28%),radial-gradient(circle_at_86%_58%,rgba(125,154,162,0.18),transparent_30%)]" />
      <motion.span
        aria-hidden="true"
        className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-ink/24 to-transparent"
        animate={shouldMove ? { x: ['-12%', '12%', '-12%'], opacity: [0.22, 0.72, 0.22] } : undefined}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center">
        <div data-gsap-reveal className="min-w-0">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.32em] text-moss">
            <Sparkles className="h-4 w-4" />
            NODE OPENING
          </p>
          <h2 className="mt-3 truncate text-2xl font-semibold text-ink">{surface.title}</h2>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink/58">
            {surface.description}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {facts.map((fact) => (
            <div key={fact.caption} data-gsap-reveal className="flex min-w-0 items-center gap-3 rounded-[1rem] border border-ink/8 bg-paper/60 p-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[0.8rem] bg-ink text-paper">
                <fact.icon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-ink">{fact.label}</span>
                <span className="mt-0.5 block truncate text-xs text-ink/48">{fact.caption}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

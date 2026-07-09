'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Clock, DoorOpen, MapPinned, Orbit, ShieldCheck, Sparkles } from 'lucide-react'
import type { NodeOpeningSurface } from '@/lib/public-world-surfaces'
import { useWorldRuntime } from '@/components/world/WorldRuntimeProvider'
import { useGsapEntrance } from '@/components/world/useGsapEntrance'

export function NodeOpeningRitual({ surface }: { surface: NodeOpeningSurface }) {
  const rootRef = useRef<HTMLElement | null>(null)
  const runtime = useWorldRuntime()
  const shouldMove = runtime.motionMode === 'full'
  useGsapEntrance(rootRef, shouldMove, '[data-gsap-reveal]', 'focus')

  const facts = [
    { icon: MapPinned, label: surface.areaLabel, caption: '所在星域' },
    { icon: BookOpen, label: surface.lifeStageLabel, caption: '生命阶段' },
    { icon: Clock, label: surface.readingLabel, caption: '阅读节奏' },
  ]

  return (
    <section ref={rootRef} className="relative overflow-hidden rounded-[1.65rem] border border-white/65 bg-night p-5 text-paper shadow-soft backdrop-blur sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(197,164,109,0.24),transparent_30%),radial-gradient(circle_at_86%_58%,rgba(125,154,162,0.2),transparent_32%)]" />
      <div className="absolute inset-x-8 bottom-10 top-24 hidden opacity-30 md:block">
        <div className="h-full border-l border-paper/18">
          <div className="mt-16 h-px bg-paper/18" />
          <div className="mt-20 h-px bg-paper/18" />
        </div>
      </div>
      <motion.span
        aria-hidden="true"
        className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-gold/45 to-transparent"
        animate={shouldMove ? { x: ['-12%', '12%', '-12%'], opacity: [0.22, 0.72, 0.22] } : undefined}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_23rem] lg:items-center">
        <div data-gsap-reveal className="min-w-0">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.32em] text-gold">
            <Sparkles className="h-4 w-4" />
            NODE GATE · 节点门厅
          </p>
          <h2 className="mt-3 break-words text-3xl font-semibold leading-tight text-paper">{surface.title}</h2>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-paper/64">
            {surface.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-paper/16 bg-paper/8 px-3 py-1.5 text-xs font-semibold text-paper/78">
              <DoorOpen className="h-4 w-4 text-gold" />
              {surface.placeLabel}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-paper/16 bg-paper/8 px-3 py-1.5 text-xs font-semibold text-paper/78">
              <ShieldCheck className="h-4 w-4 text-leaf" />
              {surface.boundaryLabel}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-paper/16 bg-paper/8 px-3 py-1.5 text-xs font-semibold text-paper/78">
              <Orbit className="h-4 w-4 text-gold" />
              {surface.lifeStatusLabel}
            </span>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {surface.signals.map((signal) => (
              <div key={signal.label} className="rounded-[1rem] border border-paper/12 bg-paper/7 p-3">
                <p className="text-xs font-semibold tracking-[0.22em] text-gold">{signal.label}</p>
                <p className="mt-2 truncate text-sm font-semibold text-paper">{signal.value}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-paper/48">{signal.note}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {facts.map((fact) => (
            <div key={fact.caption} data-gsap-reveal className="flex min-w-0 items-center gap-3 rounded-[1rem] border border-paper/12 bg-paper/8 p-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[0.8rem] bg-paper text-ink">
                <fact.icon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-paper">{fact.label}</span>
                <span className="mt-0.5 block truncate text-xs text-paper/48">{fact.caption}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

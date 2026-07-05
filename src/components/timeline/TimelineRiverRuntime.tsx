'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { GitBranch, Radio, Waves } from 'lucide-react'
import type { TimelineRiverSurface } from '@/lib/public-world-surfaces'
import { useWorldRuntime } from '@/components/world/WorldRuntimeProvider'
import { useGsapEntrance } from '@/components/world/useGsapEntrance'

export function TimelineRiverRuntime({ surface }: { surface: TimelineRiverSurface }) {
  const rootRef = useRef<HTMLElement | null>(null)
  const runtime = useWorldRuntime()
  const shouldMove = !runtime.reducedMotion
  useGsapEntrance(rootRef, shouldMove, '[data-gsap-reveal]', 'flow')

  return (
    <section ref={rootRef} className="overflow-hidden rounded-[1.75rem] border border-white/65 bg-white/72 shadow-soft backdrop-blur">
      <div data-gsap-reveal className="border-b border-ink/10 p-6 sm:p-8">
        <p className="flex items-center gap-2 text-sm font-semibold tracking-[0.32em] text-moss">
          <Waves className="h-4 w-4" />
          LIVE TIME RIVER
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <h2 className="text-3xl font-semibold text-ink sm:text-4xl">时间流开始有水位</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-ink/64">
              最近的公开事件被折成一条可观察的河道：更新、发布、区域苏醒会在这里形成节奏。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-[1.1rem] bg-ink p-4 text-paper">
              <Radio className="h-4 w-4 text-leaf" />
              <p className="mt-3 text-2xl font-semibold">{surface.items.length}</p>
              <p className="mt-1 text-xs text-paper/55">近期事件入河</p>
            </div>
            <div className="rounded-[1.1rem] bg-paper p-4 text-ink">
              <GitBranch className="h-4 w-4 text-lake" />
              <p className="mt-3 text-2xl font-semibold">{runtime.visitedCount}</p>
              <p className="mt-1 text-xs text-ink/48">本地访问脉冲</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative min-h-[24rem] overflow-hidden bg-[linear-gradient(115deg,rgba(247,241,230,0.72),rgba(216,226,208,0.46),rgba(125,154,162,0.22))] p-6 sm:p-8">
        <motion.div
          aria-hidden="true"
          className="absolute left-[-12%] top-1/2 h-24 w-[124%] -translate-y-1/2 rounded-full border-y border-white/70 bg-white/24 blur-[1px]"
          animate={shouldMove ? { x: ['-2%', '3%', '-2%'] } : undefined}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute left-[-10%] top-[53%] h-px w-[120%] bg-gradient-to-r from-transparent via-ink/34 to-transparent"
          animate={shouldMove ? { opacity: [0.28, 0.82, 0.28] } : undefined}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative grid gap-4 md:grid-cols-7">
          {surface.items.map((event, index) => {
            const content = (
              <motion.article
                data-gsap-reveal
                className="group min-h-48 rounded-[1.2rem] border border-white/75 bg-white/68 p-4 shadow-[0_18px_50px_rgba(37,48,42,0.10)] backdrop-blur transition hover:-translate-y-1 hover:bg-white"
                animate={shouldMove ? { y: index % 2 === 0 ? [0, -10, 0] : [0, 10, 0] } : undefined}
                transition={{ duration: 6.5, delay: index * 0.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="block text-xs font-semibold text-moss">{event.dateLabel}</span>
                <h3 className="mt-3 line-clamp-3 text-base font-semibold leading-6 text-ink">{event.title}</h3>
                <p className="mt-3 line-clamp-3 text-xs leading-6 text-ink/56">{event.description}</p>
                <p className="mt-4 truncate text-xs text-ink/42">{event.areaLabel} · {event.actorLabel}</p>
              </motion.article>
            )

            return event.href ? (
              <Link key={event.id} href={event.href} className={index % 2 === 0 ? 'md:pt-2' : 'md:pt-16'}>
                {content}
              </Link>
            ) : (
              <div key={event.id} className={index % 2 === 0 ? 'md:pt-2' : 'md:pt-16'}>
                {content}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

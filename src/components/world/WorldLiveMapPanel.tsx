'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { DynamicWorldRouteSignal } from '@/lib/public-world-surfaces'
import { useWorldRuntime } from './WorldRuntimeProvider'

const liveNodePositions = [
  { left: '13%', top: '45%', delay: 0 },
  { left: '34%', top: '22%', delay: 0.35 },
  { left: '62%', top: '30%', delay: 0.75 },
  { left: '46%', top: '66%', delay: 1.05 },
  { left: '78%', top: '55%', delay: 1.4 },
  { left: '84%', top: '76%', delay: 1.65 },
]

const liveLines = [
  { id: 'a', left: '20%', top: '42%', width: '24%', rotate: '-24deg', delay: 0 },
  { id: 'b', left: '39%', top: '27%', width: '27%', rotate: '11deg', delay: 0.5 },
  { id: 'c', left: '50%', top: '61%', width: '31%', rotate: '-11deg', delay: 0.9 },
  { id: 'd', left: '31%', top: '56%', width: '22%', rotate: '32deg', delay: 1.2 },
]

export function WorldLiveMapPanel({ routes }: { routes: DynamicWorldRouteSignal[] }) {
  const { reducedMotion, dayPeriod } = useWorldRuntime()
  const shouldMove = !reducedMotion
  const glow = dayPeriod === 'night' ? 'bg-paper/12' : 'bg-paper/18'
  const visibleRoutes = routes.slice(0, liveNodePositions.length)

  return (
    <div className="relative min-h-[190px] overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/6">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(247,241,230,0.10),transparent_42%),linear-gradient(90deg,rgba(197,164,109,0.10),rgba(125,154,162,0.10))]" />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(247,241,230,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(247,241,230,0.12)_1px,transparent_1px)] [background-size:42px_42px]" />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[16rem] w-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
        animate={shouldMove ? { rotate: 360 } : undefined}
        transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[10rem] w-[10rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20"
        animate={shouldMove ? { rotate: -360, scale: [1, 1.04, 1] } : undefined}
        transition={{ rotate: { duration: 38, repeat: Infinity, ease: 'linear' }, scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' } }}
      />
      {liveLines.map((line) => (
        <motion.span
          key={line.id}
          className="absolute h-px origin-left bg-gradient-to-r from-paper/5 via-paper/70 to-paper/5"
          style={{ left: line.left, top: line.top, width: line.width, rotate: line.rotate }}
          animate={shouldMove ? { opacity: [0.22, 0.95, 0.22], x: [0, 9, 0] } : undefined}
          transition={{ duration: 5.8, delay: line.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {visibleRoutes.map((route, index) => {
        const position = liveNodePositions[index]

        return (
          <Link
            key={route.id}
            href={route.href}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: position.left, top: position.top }}
            aria-label={`进入${route.title}`}
          >
            <motion.span
              className={`flex h-12 w-12 items-center justify-center rounded-[1rem] border border-white/25 ${glow} text-[11px] font-semibold text-paper shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur transition hover:border-gold/60 hover:bg-paper/24`}
              animate={shouldMove ? { y: [0, -7, 0], opacity: [0.72, 1, 0.72] } : undefined}
              transition={{ duration: 5.2, delay: position.delay, repeat: Infinity, ease: 'easeInOut' }}
            >
              {route.shortLabel}
            </motion.span>
          </Link>
        )
      })}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-3 text-[11px] text-paper/55">
        <span className="truncate">runtime://public-world</span>
        <span className="shrink-0">live</span>
      </div>
    </div>
  )
}

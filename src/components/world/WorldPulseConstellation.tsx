'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Activity, ArrowRight, Radio, Route } from 'lucide-react'
import type { HomeDynamicWorldSurface } from '@/lib/public-world-surfaces'
import { useWorldRuntime } from './WorldRuntimeProvider'

const routePositions = [
  { left: '12%', top: '42%', delay: 0 },
  { left: '30%', top: '20%', delay: 0.24 },
  { left: '56%', top: '26%', delay: 0.48 },
  { left: '76%', top: '48%', delay: 0.72 },
  { left: '48%', top: '70%', delay: 0.96 },
  { left: '20%', top: '72%', delay: 1.2 },
]

const connectionLines = [
  { id: 'route-atlas', left: '18%', top: '38%', width: '25%', rotate: '-27deg', delay: 0 },
  { id: 'atlas-time', left: '36%', top: '24%', width: '25%', rotate: '9deg', delay: 0.36 },
  { id: 'time-ask', left: '60%', top: '34%', width: '23%', rotate: '28deg', delay: 0.72 },
  { id: 'path-archive', left: '28%', top: '67%', width: '26%', rotate: '-5deg', delay: 1.08 },
]

const dayPeriodText = {
  dawn: '清晨同步',
  day: '白日运行',
  dusk: '黄昏回流',
  night: '深夜低光',
} as const

export function WorldPulseConstellation({ surface }: { surface: HomeDynamicWorldSurface }) {
  const runtime = useWorldRuntime()
  const shouldMove = runtime.motionMode === 'full'
  const activeRoutes = surface.routes.slice(0, routePositions.length)
  const primaryRoute = surface.routes.find((route) => route.href === surface.primaryHref) ?? surface.routes[0]
  const publicRouteCount = surface.routes.filter((route) => route.id !== 'home').length
  const entryCount = surface.entryPoints.length

  return (
    <div data-testid="dynamic-world-status-card" className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/7 p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-semibold text-gold">
            <Radio className="h-3.5 w-3.5" />
            <span>{dayPeriodText[runtime.dayPeriod]}</span>
          </div>
          <h3 className="mt-2 text-xl font-semibold text-paper">公开宇宙正在运行</h3>
          <p className="mt-2 text-sm leading-6 text-paper/64">
            {publicRouteCount} 条公开航道、{entryCount} 个低门槛入口，当前推荐从 {primaryRoute?.shortLabel ?? '入口'} 开始。
          </p>
        </div>
        {primaryRoute && (
          <Link href={primaryRoute.href} className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/12 bg-paper/12 px-4 py-2 text-xs font-semibold text-paper transition hover:border-gold/50 hover:bg-paper/20">
            {primaryRoute.shortLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      <div className="relative mt-5 h-44 overflow-hidden rounded-[1rem] border border-white/10 bg-night/35">
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(247,241,230,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(247,241,230,0.10)_1px,transparent_1px)] [background-size:34px_34px]" />
        <motion.div
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/15"
          animate={shouldMove ? { rotate: 360, scale: [1, 1.04, 1] } : undefined}
          transition={{ rotate: { duration: 42, repeat: Infinity, ease: 'linear' }, scale: { duration: 9, repeat: Infinity, ease: 'easeInOut' } }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-paper/12"
          animate={shouldMove ? { rotate: -360 } : undefined}
          transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
        />
        {connectionLines.map((line) => (
          <motion.span
            key={line.id}
            className="absolute h-px origin-left bg-gradient-to-r from-transparent via-gold/70 to-transparent"
            style={{ left: line.left, top: line.top, width: line.width, rotate: line.rotate }}
            animate={shouldMove ? { opacity: [0.18, 0.88, 0.18], x: [0, 8, 0] } : undefined}
            transition={{ duration: 5.6, delay: line.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
        {activeRoutes.map((route, index) => {
          const position = routePositions[index]
          const isPrimary = route.href === surface.primaryHref

          return (
            <Link
              key={route.id}
              href={route.href}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: position.left, top: position.top }}
              aria-label={`进入${route.title}`}
            >
              <motion.span
                className={isPrimary
                  ? 'flex h-12 w-12 items-center justify-center rounded-[1rem] border border-gold/70 bg-gold/22 text-[11px] font-semibold text-paper shadow-[0_0_28px_rgba(197,164,109,0.22)] backdrop-blur'
                  : 'flex h-11 w-11 items-center justify-center rounded-[1rem] border border-white/18 bg-paper/10 text-[11px] font-semibold text-paper/82 backdrop-blur transition hover:border-gold/55 hover:bg-paper/18'}
                animate={shouldMove ? { y: [0, -6, 0], opacity: isPrimary ? [0.86, 1, 0.86] : [0.58, 0.95, 0.58] } : undefined}
                transition={{ duration: 4.8, delay: position.delay, repeat: Infinity, ease: 'easeInOut' }}
              >
                {route.shortLabel}
              </motion.span>
            </Link>
          )
        })}
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <div className="rounded-[1rem] bg-paper/10 p-3">
          <p className="flex items-center gap-2 text-xs font-semibold text-paper"><Activity className="h-3.5 w-3.5 text-gold" />运行态</p>
          <p className="mt-1 text-xs leading-5 text-paper/58">第 {runtime.visitedCount} 次进入</p>
        </div>
        <div className="rounded-[1rem] bg-paper/10 p-3">
          <p className="flex items-center gap-2 text-xs font-semibold text-paper"><Route className="h-3.5 w-3.5 text-gold" />推荐路</p>
          <p className="mt-1 truncate text-xs leading-5 text-paper/58">{primaryRoute?.title ?? surface.title}</p>
        </div>
        <div className="rounded-[1rem] bg-paper/10 p-3">
          <p className="text-xs font-semibold text-paper">动效</p>
          <p className="mt-1 text-xs leading-5 text-paper/58">{runtime.reducedMotion ? '低动效' : '轻动效'}</p>
        </div>
      </div>
    </div>
  )
}

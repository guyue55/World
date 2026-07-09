'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Compass, MapPinned, Sparkles } from 'lucide-react'
import type { AtlasAreaSignal, AtlasConstellationSurface } from '@/lib/public-world-surfaces'
import { useWorldRuntime } from '@/components/world/WorldRuntimeProvider'
import { useGsapEntrance } from '@/components/world/useGsapEntrance'

type Point = {
  area: AtlasAreaSignal
  left: number
  top: number
}

const positions = [
  { left: 16, top: 29 },
  { left: 35, top: 18 },
  { left: 62, top: 22 },
  { left: 82, top: 39 },
  { left: 72, top: 70 },
  { left: 47, top: 78 },
  { left: 22, top: 67 },
  { left: 50, top: 48 },
]

function lineStyle(from: Point, to: Point) {
  const dx = to.left - from.left
  const dy = to.top - from.top
  const length = Math.sqrt(dx * dx + dy * dy)
  const angle = Math.atan2(dy, dx) * (180 / Math.PI)

  return {
    left: `${from.left}%`,
    top: `${from.top}%`,
    width: `${length}%`,
    transform: `rotate(${angle}deg)`,
  }
}

export function AtlasLiveConstellation({ surface }: { surface: AtlasConstellationSurface }) {
  const rootRef = useRef<HTMLElement | null>(null)
  const runtime = useWorldRuntime()
  const shouldMove = runtime.motionMode === 'full'
  useGsapEntrance(rootRef, shouldMove, '[data-gsap-reveal]', 'connection')

  const points = surface.areas.slice(0, positions.length).map((area, index) => ({
    area,
    ...positions[index],
  }))
  const pointById = new Map(points.map((point) => [point.area.id, point]))
  const visibleLinks = surface.links
    .map((link) => ({ link, from: pointById.get(link.fromId), to: pointById.get(link.toId) }))
    .filter((item): item is { link: AtlasConstellationSurface['links'][number]; from: Point; to: Point } => Boolean(item.from && item.to))
    .slice(0, 10)

  return (
    <section ref={rootRef} className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-ink text-paper shadow-soft">
      <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative min-h-[28rem] overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_32%_24%,rgba(189,207,168,0.22),transparent_34%),radial-gradient(circle_at_76%_68%,rgba(125,154,162,0.28),transparent_35%)] lg:border-b-0 lg:border-r">
          <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(247,241,230,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(247,241,230,0.14)_1px,transparent_1px)] [background-size:64px_64px]" />
          {visibleLinks.map(({ link, from, to }, index) => (
            <motion.span
              key={link.id}
              className="absolute h-px origin-left bg-gradient-to-r from-transparent via-paper/58 to-transparent"
              style={lineStyle(from, to)}
              animate={shouldMove ? { opacity: [0.24, 0.82, 0.24] } : undefined}
              transition={{ duration: 5.5, delay: index * 0.22, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
          {points.map((point, index) => (
            <Link
              key={point.area.id}
              href={point.area.href}
              className="group absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${point.left}%`, top: `${point.top}%` }}
            >
              <motion.span
                className="block rounded-[1.2rem] border border-paper/35 bg-paper/12 px-4 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl transition group-hover:border-paper/70 group-hover:bg-paper/20"
                animate={shouldMove ? { y: [0, -8, 0] } : undefined}
                transition={{ duration: 6, delay: index * 0.28, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="block truncate text-sm font-semibold">{point.area.icon} {point.area.title}</span>
                <span className="mt-1 block truncate text-xs text-paper/58">{point.area.publicNodeCount} 个公开节点 · {point.area.accessLabel}</span>
              </motion.span>
              <motion.span
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 -z-10 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-paper/18"
                animate={shouldMove ? { scale: [0.72, 1.28, 0.72], opacity: [0.18, 0.48, 0.18] } : undefined}
                transition={{ duration: 4.8, delay: index * 0.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </Link>
          ))}
        </div>

        <div className="flex flex-col justify-between gap-8 p-6 sm:p-8">
          <div data-gsap-reveal>
            <p className="flex items-center gap-2 text-sm font-semibold tracking-[0.32em] text-paper/58">
              <Sparkles className="h-4 w-4" />
              LIVE ATLAS
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">世界地图开始发光了</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-paper/68">
              区域、公开节点和星线现在被组织成一个可进入的动态星图。点击任意区域，就会落到对应节点簇。
            </p>
          </div>
          <div data-gsap-reveal className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.1rem] border border-paper/12 bg-paper/8 p-4">
              <MapPinned className="h-5 w-5 text-leaf" />
              <p className="mt-3 text-2xl font-semibold">{points.length}</p>
              <p className="mt-1 text-xs text-paper/52">主区域已点亮</p>
            </div>
            <div className="rounded-[1.1rem] border border-paper/12 bg-paper/8 p-4">
              <Compass className="h-5 w-5 text-lake" />
              <p className="mt-3 text-2xl font-semibold">{visibleLinks.length}</p>
              <p className="mt-1 text-xs text-paper/52">公开星线正在连接</p>
            </div>
          </div>
          
          <div data-gsap-reveal className="rounded-[1.1rem] border border-gold/30 bg-gold/10 p-5">
            <p className="text-xs font-semibold tracking-[0.2em] text-gold">NEXT STEP</p>
            <h3 className="mt-2 font-semibold text-paper">{surface.guideTitle}</h3>
            <p className="mt-2 text-sm leading-6 text-paper/70">{surface.guideDescription}</p>
            <div className="mt-4 grid gap-2">
              {surface.actions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={`rounded-[1rem] px-4 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${
                    action.tone === 'primary'
                      ? 'bg-gold text-night hover:bg-gold/90'
                      : 'border border-paper/14 bg-paper/8 text-paper/78 hover:bg-paper/14'
                  }`}
                >
                  <span className="block">{action.label}</span>
                  <span className="mt-1 block text-xs font-normal opacity-70">{action.description}</span>
                </Link>
              ))}
            </div>
          </div>

          <div data-gsap-reveal className="rounded-[1.1rem] border border-paper/12 bg-paper/8 p-4 text-sm leading-7 text-paper/62">
            当前运行态：{runtime.season} · {runtime.dayPeriod}。动效可通过左下角运行坞切换。
          </div>
        </div>
      </div>
    </section>
  )
}

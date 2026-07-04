'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { useWorldRuntime } from '@/components/r8-dynamic-world'
import { resolveSensoryScene } from './SensoryUniverseEngine'

const weatherText: Record<string, string> = {
  '星尘晴': '清澈星尘',
  '薄雾星图': '薄雾观测',
  '月光流动': '月光水纹',
  '纸尘微光': '档案纸尘',
  '星线微亮': '路径星线',
  '金色低光': '灯塔低光',
  '静读微尘': '阅读微尘',
  '工作灯': '创世工作灯',
}

export function CosmicWeatherLayer() {
  const pathname = usePathname()
  const scene = useMemo(() => resolveSensoryScene(pathname), [pathname])
  const { reducedMotion, lowLight } = useWorldRuntime()
  const particles = Array.from({ length: lowLight ? 12 : 22 }, (_, index) => index)

  return (
    <div className="pointer-events-none fixed inset-0 z-[16] overflow-hidden" aria-hidden="true">
      <div className="absolute left-6 top-24 hidden rounded-full border border-white/25 bg-white/15 px-4 py-2 text-[10px] font-semibold tracking-[0.26em] text-ink/35 backdrop-blur lg:block">
        {weatherText[scene.weather] ?? scene.weather}
      </div>
      {particles.map((particle) => (
        <motion.span
          key={`${scene.weather}-${particle}`}
          className="absolute h-1 w-1 rounded-full bg-white/55 shadow-soft"
          style={{ left: `${(particle * 37) % 100}%`, top: `${(particle * 23) % 100}%` }}
          animate={reducedMotion ? undefined : { y: [0, -18 - (particle % 7), 0], opacity: [0.08, 0.42, 0.08], scale: [0.8, 1.45, 0.8] }}
          transition={{ duration: 7 + (particle % 6), repeat: Infinity, ease: 'easeInOut', delay: particle * 0.11 }}
        />
      ))}
      <motion.div
        className="absolute -right-28 top-1/4 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        animate={reducedMotion ? undefined : { scale: [1, 1.18, 1], opacity: [0.18, 0.34, 0.18] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-28 bottom-1/4 h-80 w-80 rounded-full bg-lake/10 blur-3xl"
        animate={reducedMotion ? undefined : { scale: [1.1, 0.92, 1.1], opacity: [0.12, 0.28, 0.12] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

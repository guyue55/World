'use client'

import { motion } from 'framer-motion'
import { useWorldRuntime } from './WorldRuntimeProvider'

const stars = Array.from({ length: 28 }, (_, index) => ({
  id: `star-${index}`,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 19) % 88}%`,
  size: 2 + (index % 4),
  delay: (index % 7) * 0.45,
}))

const papers = [
  { id: 'paper-1', left: '8%', top: '18%', rotate: -8 },
  { id: 'paper-2', left: '74%', top: '22%', rotate: 11 },
  { id: 'paper-3', left: '18%', top: '72%', rotate: 7 },
  { id: 'paper-4', left: '88%', top: '68%', rotate: -13 },
]

const seasonTone = {
  spring: 'from-mist/25 via-white/10 to-transparent',
  summer: 'from-lake/20 via-white/10 to-transparent',
  autumn: 'from-gold/20 via-white/10 to-transparent',
  winter: 'from-night/10 via-white/10 to-transparent',
}

export function WorldMotionLayer() {
  const { reducedMotion, season, dayPeriod } = useWorldRuntime()
  const isNight = dayPeriod === 'night'

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className={`absolute inset-0 bg-gradient-to-br ${seasonTone[season]}`} />
      <motion.div
        className="absolute left-1/2 top-[-10rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-white/35 blur-3xl"
        animate={reducedMotion ? undefined : { opacity: isNight ? [0.2, 0.34, 0.2] : [0.36, 0.58, 0.36], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.72)]"
          style={{ left: star.left, top: star.top, width: star.size, height: star.size }}
          animate={reducedMotion ? undefined : { opacity: [0.16, 0.78, 0.16], y: [0, -8, 0] }}
          transition={{ duration: 4 + (star.size % 3), delay: star.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {papers.map((paper) => (
        <motion.span
          key={paper.id}
          className="absolute h-10 w-7 rounded-sm border border-white/50 bg-white/20 backdrop-blur"
          style={{ left: paper.left, top: paper.top, rotate: paper.rotate }}
          animate={reducedMotion ? undefined : { y: [0, -12, 0], rotate: [paper.rotate, paper.rotate + 4, paper.rotate] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

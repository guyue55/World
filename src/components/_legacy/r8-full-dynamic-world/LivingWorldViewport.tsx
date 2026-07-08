'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useWorldRuntime } from '@/components/_legacy/r8-dynamic-world'

const microObjects = [
  { id: 'paper-1', label: '纸页', left: 12, top: 18, delay: 0 },
  { id: 'dust-1', label: '星尘', left: 76, top: 20, delay: 0.8 },
  { id: 'lamp-1', label: '灯光', left: 20, top: 74, delay: 1.6 },
  { id: 'river-1', label: '时间涟漪', left: 68, top: 78, delay: 2.2 },
  { id: 'door-1', label: '远门', left: 46, top: 28, delay: 2.8 },
]

export function LivingWorldViewport() {
  const { reducedMotion, dayPeriod, season } = useWorldRuntime()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -90])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 16])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[70vw] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/35"
        style={{ y: reducedMotion ? 0 : y, rotate: reducedMotion ? 0 : rotate }}
      />
      <motion.div
        className="absolute left-[8%] top-[14%] h-56 w-56 rounded-full bg-gold/14 blur-3xl"
        animate={reducedMotion ? undefined : { scale: [1, 1.22, 1], opacity: [0.18, 0.38, 0.18] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[8%] right-[6%] h-64 w-64 rounded-full bg-lake/18 blur-3xl"
        animate={reducedMotion ? undefined : { scale: [1, 1.18, 1], opacity: [0.2, 0.42, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      {microObjects.map((object) => (
        <motion.span
          key={object.id}
          className="absolute hidden rounded-full border border-white/50 bg-white/28 px-3 py-1 text-[10px] font-semibold text-ink/34 shadow-soft backdrop-blur lg:block"
          style={{ left: `${object.left}%`, top: `${object.top}%` }}
          animate={reducedMotion ? undefined : { y: [0, -18, 0], x: [0, 8, 0], opacity: [0.15, 0.55, 0.15] }}
          transition={{ duration: 9 + object.delay, delay: object.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {object.label}
        </motion.span>
      ))}
      <div className="absolute bottom-6 left-6 hidden rounded-full border border-white/45 bg-white/35 px-4 py-2 text-[10px] font-semibold tracking-[0.3em] text-ink/28 backdrop-blur lg:block">
        {season} · {dayPeriod} · living viewport
      </div>
    </div>
  )
}

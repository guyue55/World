'use client'

import { motion } from 'framer-motion'
import { useWorldRuntime } from '@/components/_legacy/r8-dynamic-world'
import sceneData from '../../../data/r8-scene-universe/scene-universe.json'

function depthDelay(index: number) {
  return index * 0.18
}

export function SceneDepthField() {
  const { reducedMotion } = useWorldRuntime()
  const scale = sceneData.worldScale

  return (
    <div className="pointer-events-none fixed inset-0 z-[10] hidden overflow-hidden lg:block" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.22),transparent_30%),radial-gradient(circle_at_80%_40%,rgba(214,180,106,0.13),transparent_28%)]" />
      {scale.near.slice(0, 5).map((item, index) => (
        <motion.span
          key={`near-${item}`}
          className="absolute rounded-full border border-white/35 bg-white/16 px-3 py-1 text-[10px] font-semibold text-ink/18 backdrop-blur"
          style={{ left: `${8 + index * 10}%`, bottom: `${12 + (index % 2) * 5}%` }}
          animate={reducedMotion ? undefined : { y: [0, -5, 0], opacity: [0.16, 0.28, 0.16] }}
          transition={{ duration: 6 + index, repeat: Infinity, delay: depthDelay(index) }}
        >
          {item}
        </motion.span>
      ))}
      {scale.middle.slice(0, 6).map((item, index) => (
        <motion.span
          key={`middle-${item}`}
          className="absolute rounded-full bg-moss/8 px-3 py-1 text-[10px] font-semibold text-moss/18"
          style={{ right: `${6 + index * 8}%`, top: `${18 + (index % 3) * 10}%` }}
          animate={reducedMotion ? undefined : { x: [0, 6, 0], opacity: [0.12, 0.24, 0.12] }}
          transition={{ duration: 8 + index, repeat: Infinity, delay: depthDelay(index) }}
        >
          {item}
        </motion.span>
      ))}
      {scale.far.slice(0, 6).map((item, index) => (
        <motion.span
          key={`far-${item}`}
          className="absolute rounded-full border border-gold/10 bg-gold/5 px-3 py-1 text-[10px] font-semibold text-gold/20"
          style={{ left: `${18 + index * 12}%`, top: `${8 + (index % 2) * 9}%` }}
          animate={reducedMotion ? undefined : { scale: [1, 1.04, 1], opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 10 + index, repeat: Infinity, delay: depthDelay(index) }}
        >
          {item}
        </motion.span>
      ))}
    </div>
  )
}

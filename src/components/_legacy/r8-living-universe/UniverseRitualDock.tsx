'use client'

import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useWorldRuntime } from '@/components/r8-dynamic-world'
import { resolveLivingScene } from './LivingUniverseField'

const ritualCopy: Record<string, string> = {
  observe: '罗盘短暂亮起，当前位置已经被记录为一次观测。',
  open: '一张纸页靠近，当前区域的现实解释被展开。',
  drift: '星路重新排列，下一段旅程从当前页面继续。',
  echo: '时间河带回一枚旧回声，提示世界并非只有现在。',
  light: '当前区域被轻轻点亮，像一颗进入高光的星。',
  archive: '卷宗合上，内容被送回可查找的档案层。',
  return: '归途显现，世界入口仍然在原点发光。'
}

const ritualLabels = [
  ['observe', '观测'],
  ['open', '展开'],
  ['drift', '漂流'],
  ['echo', '回声'],
  ['light', '点亮'],
  ['archive', '归档'],
  ['return', '归途']
] as const

export function UniverseRitualDock() {
  const pathname = usePathname()
  const scene = useMemo(() => resolveLivingScene(pathname), [pathname])
  const { reducedMotion } = useWorldRuntime()
  const [ritual, setRitual] = useState('observe')

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-3 z-[49] hidden justify-center px-4 lg:flex">
      <motion.div
        className="pointer-events-auto flex max-w-5xl flex-wrap items-center justify-center gap-2 rounded-full border border-white/60 bg-white/76 px-3 py-2 text-xs shadow-soft backdrop-blur-xl"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <span className="px-3 font-semibold text-ink/55">{scene.worldName}</span>
        {ritualLabels.map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setRitual(id)}
            className={`rounded-full px-3 py-2 font-semibold transition ${ritual === id ? 'bg-ink text-white' : 'text-ink/55 hover:bg-sand/80'}`}
          >
            {label}
          </button>
        ))}
        <motion.span
          className="max-w-lg px-3 text-ink/55"
          animate={reducedMotion ? undefined : { opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {ritualCopy[ritual]}
        </motion.span>
      </motion.div>
    </div>
  )
}

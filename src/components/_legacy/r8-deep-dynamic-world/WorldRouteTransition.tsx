'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useWorldRuntime } from '@/components/_legacy/r8-dynamic-world'

const routeLabels: Record<string, string> = {
  '/': '创世原点',
  '/atlas': '世界地图',
  '/timeline': '时间河',
  '/archive': '档案馆',
  '/paths': '精选路径',
  '/ask': 'AI 灯塔',
}

function getRouteLabel(pathname: string) {
  if (pathname.startsWith('/node/')) return '节点卷轴'
  return routeLabels[pathname] ?? '古月浮屿'
}

export function WorldRouteTransition() {
  const pathname = usePathname()
  const { markJourney, reducedMotion } = useWorldRuntime()
  const [visible, setVisible] = useState(false)
  const label = getRouteLabel(pathname)

  useEffect(() => {
    markJourney(pathname, label)
    if (reducedMotion) return
    setVisible(true)
    const timer = window.setTimeout(() => setVisible(false), 720)
    return () => window.clearTimeout(timer)
  }, [label, markJourney, pathname, reducedMotion])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-ink/12 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <motion.div
            className="rounded-full border border-white/70 bg-white/80 px-6 py-3 text-sm font-semibold tracking-[0.28em] text-ink shadow-soft"
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
          >
            抵达 · {label}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

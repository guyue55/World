'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useWorldRuntime } from '@/components/_legacy/r8-dynamic-world'
import { getWorldObjects } from './types'

export function UniverseObjectWorkbench() {
  const objects = getWorldObjects()
  const { reducedMotion } = useWorldRuntime()
  const [active, setActive] = useState(objects[0]?.id ?? 'paper')
  const current = objects.find((item) => item.id === active) ?? objects[0]

  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[46] hidden w-[min(64rem,calc(100vw-2rem))] -translate-x-1/2 lg:block">
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 18 }}
        animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        className="pointer-events-auto rounded-[2rem] border border-white/55 bg-white/72 p-3 shadow-soft backdrop-blur"
      >
        <div className="grid gap-3 lg:grid-cols-[1fr_18rem] lg:items-center">
          <div className="flex flex-wrap gap-2">
            {objects.map((object) => (
              <button
                key={object.id}
                type="button"
                onClick={() => setActive(object.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${active === object.id ? 'bg-gold text-white' : 'bg-white/76 text-ink/52 hover:bg-white'}`}
              >
                {object.name}
              </button>
            ))}
          </div>
          <div className="rounded-[1.35rem] bg-ink p-3 text-white">
            <p className="text-xs font-semibold">{current.action}</p>
            <p className="mt-1 line-clamp-2 text-[11px] leading-5 text-white/62">{current.realName} · {current.risk} · {current.mode}</p>
            <Link href={current.href} className="mt-2 inline-flex rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-ink">
              进入
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { resolveCompleteScene } from './CompleteUniverseEngine'
import { useWorldRuntime } from '@/components/_legacy/r8-dynamic-world'

export function CompleteUniverseSection() {
  const pathname = usePathname()
  const scene = useMemo(() => resolveCompleteScene(pathname), [pathname])
  const { reducedMotion } = useWorldRuntime()

  return (
    <section className="rounded-[2.25rem] border border-white/60 bg-white/80 p-6 shadow-soft backdrop-blur md:p-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold tracking-[0.35em] text-moss">COMPLETE LIVING UNIVERSE</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">{scene.title} · 全域动态化</h2>
          <p className="mt-4 leading-8 text-ink/60">{scene.worldState}</p>
          <p className="mt-3 leading-8 text-ink/60">{scene.seasonalMood}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {scene.rituals.map((ritual) => (
              <motion.span
                key={ritual}
                className="rounded-full border border-white/70 bg-sand/70 px-4 py-2 text-xs font-semibold text-ink/60"
                animate={reducedMotion ? undefined : { y: [0, -2, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                {ritual}
              </motion.span>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/70 bg-sand/60 p-5">
          <p className="text-sm font-semibold text-ink">世界对象不是背景装饰</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {scene.objects.map((object) => (
              <span key={object} className="rounded-2xl bg-white/75 px-4 py-3 text-sm text-ink/52">
                {object}
              </span>
            ))}
          </div>
          <div className="mt-5 grid gap-2">
            {scene.next.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-full bg-ink px-4 py-3 text-center text-xs font-semibold text-white transition hover:-translate-y-0.5">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

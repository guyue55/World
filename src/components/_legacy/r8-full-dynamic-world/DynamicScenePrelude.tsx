'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useWorldRuntime } from '@/components/_legacy/r8-dynamic-world'

export type DynamicScenePreludeProps = {
  label: string
  title: string
  description: string
  primaryHref?: string
  primaryLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
  objects?: string[]
}

export function DynamicScenePrelude({
  label,
  title,
  description,
  primaryHref = '/atlas',
  primaryLabel = '打开世界地图',
  secondaryHref = '/ask',
  secondaryLabel = '询问灯塔',
  objects = ['光', '纸页', '星尘', '路径'],
}: DynamicScenePreludeProps) {
  const { markJourney, reducedMotion } = useWorldRuntime()

  return (
    <section className="relative overflow-hidden rounded-[2.8rem] border border-white/65 bg-white/78 p-6 shadow-soft backdrop-blur md:p-9">
      <motion.div
        className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/18 blur-3xl"
        animate={reducedMotion ? undefined : { scale: [1, 1.18, 1], opacity: [0.28, 0.52, 0.28] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center">
        <div>
          <p className="text-xs font-semibold tracking-[0.38em] text-moss">{label}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-ink md:text-6xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-ink/66">{description}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={primaryHref} onClick={() => markJourney(primaryHref, primaryLabel)} className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
              {primaryLabel}
            </Link>
            <Link href={secondaryHref} onClick={() => markJourney(secondaryHref, secondaryLabel)} className="rounded-full border border-ink/10 bg-white/65 px-5 py-3 text-sm font-semibold text-ink/70 transition hover:-translate-y-0.5 hover:bg-white">
              {secondaryLabel}
            </Link>
          </div>
        </div>
        <div className="relative min-h-[18rem] rounded-[2rem] border border-white/60 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.95),rgba(212,183,126,0.22)_48%,rgba(125,154,162,0.12)_100%)] p-5">
          <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-ink/12" />
          {objects.map((object, index) => (
            <motion.div
              key={object}
              className="absolute rounded-2xl border border-white/60 bg-white/70 px-3 py-2 text-xs font-semibold text-ink/58 shadow-soft"
              style={{ left: `${18 + (index * 23) % 62}%`, top: `${18 + (index * 31) % 62}%` }}
              animate={reducedMotion ? undefined : { y: [0, -8 - index, 0], opacity: [0.64, 1, 0.64] }}
              transition={{ duration: 4.6 + index * 0.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {object}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

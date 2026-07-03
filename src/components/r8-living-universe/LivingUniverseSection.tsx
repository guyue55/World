'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { resolveLivingScene } from './LivingUniverseField'

export function LivingUniverseSection() {
  const pathname = usePathname()
  const scene = useMemo(() => resolveLivingScene(pathname), [pathname])

  return (
    <section className="rounded-[2rem] border border-white/60 bg-white/78 p-6 shadow-soft backdrop-blur md:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold tracking-[0.35em] text-moss">LIVING UNIVERSE</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">{scene.worldName}正在运行</h2>
          <p className="mt-4 leading-8 text-ink/68">{scene.answer}</p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-[1.5rem] bg-sand/70 p-4">
              <p className="text-[11px] font-semibold tracking-[0.24em] text-ink/45">NEAR</p>
              <p className="mt-2 text-sm text-ink/65">{scene.near.join(' / ')}</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/70 p-4">
              <p className="text-[11px] font-semibold tracking-[0.24em] text-ink/45">MID</p>
              <p className="mt-2 text-sm text-ink/65">{scene.mid.join(' / ')}</p>
            </div>
            <div className="rounded-[1.5rem] bg-lake/10 p-4">
              <p className="text-[11px] font-semibold tracking-[0.24em] text-ink/45">FAR</p>
              <p className="mt-2 text-sm text-ink/65">{scene.far.join(' / ')}</p>
            </div>
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/70 bg-sand/55 p-5">
          <p className="text-sm font-semibold text-ink">文明痕迹</p>
          <div className="mt-4 space-y-3">
            {scene.civilization.map((item) => (
              <div key={item} className="rounded-2xl bg-white/70 px-4 py-3 text-sm text-ink/65">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {scene.next.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

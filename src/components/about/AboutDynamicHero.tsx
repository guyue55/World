'use client'

import Link from 'next/link'
import { useRef } from 'react'
import type { AboutDynamicSurface } from '@/lib/public-world-surfaces'
import { useGsapEntrance } from '@/components/world/useGsapEntrance'

export function AboutDynamicHero({ surface }: { surface: AboutDynamicSurface }) {
  const containerRef = useRef<HTMLDivElement>(null)
  useGsapEntrance(containerRef, true)

  return (
    <div ref={containerRef} className="space-y-10">
      <section data-gsap-reveal className="relative overflow-hidden rounded-[2.25rem] border border-white/65 bg-white/76 p-8 shadow-soft backdrop-blur md:p-10">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-lake/18 blur-3xl" />
        <div className="relative max-w-4xl space-y-5">
          <p className="text-xs font-semibold tracking-[0.35em] text-moss">{surface.eyebrow}</p>
          <h1 className="break-words text-5xl font-semibold leading-tight text-ink md:text-6xl">{surface.title}</h1>
          <p className="break-words text-lg leading-9 text-ink/72">
            {surface.description}
          </p>
        </div>
      </section>

      <section data-gsap-reveal className="grid gap-4 md:grid-cols-3">
        {surface.identityCards.map((card) => (
          <article key={card.title} className="rounded-[1.6rem] border border-white/65 bg-white/74 p-6 shadow-soft backdrop-blur">
            <h2 className="break-words text-2xl font-semibold text-ink">{card.title}</h2>
            <p className="mt-3 break-words text-sm leading-7 text-ink/64">{card.body}</p>
          </article>
        ))}
      </section>

      <section data-gsap-reveal className="rounded-[2rem] border border-white/65 bg-night p-7 text-paper shadow-soft md:p-8">
        <p className="text-xs font-semibold tracking-[0.35em] text-gold">继续路径</p>
        <h2 className="mt-3 break-words text-3xl font-semibold">第一次来，可以先走一条清晰路径。</h2>
        <p className="mt-3 max-w-3xl break-words leading-8 text-paper/68">
          不需要一次理解全部宇宙。先从世界地图、时间流或宪章开始，再进入具体节点。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {surface.actions.map(action => (
            <Link key={action.href} href={action.href} className={
              action.style === 'primary' ? "rounded-full bg-paper px-5 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5" :
              action.style === 'secondary' ? "rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-paper transition hover:-translate-y-0.5 hover:bg-white/10" :
              "rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-paper/80 transition hover:-translate-y-0.5 hover:bg-white/10"
            }>
              {action.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

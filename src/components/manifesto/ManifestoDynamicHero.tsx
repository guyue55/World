'use client'

import Link from 'next/link'
import { useRef } from 'react'
import type { ManifestoDynamicSurface } from '@/lib/public-world-surfaces'
import { useGsapEntrance } from '@/components/world/useGsapEntrance'

export function ManifestoDynamicHero({ surface }: { surface: ManifestoDynamicSurface }) {
  const containerRef = useRef<HTMLDivElement>(null)
  useGsapEntrance(containerRef, true)

  return (
    <div ref={containerRef} className="space-y-10">
      <section data-gsap-reveal className="relative overflow-hidden rounded-[2.25rem] border border-white/65 bg-night p-8 text-paper shadow-soft md:p-10">
        <div className="absolute -right-16 top-0 h-72 w-72 rounded-full bg-gold/18 blur-3xl" />
        <div className="relative max-w-4xl space-y-5">
          <p className="text-xs font-semibold tracking-[0.35em] text-gold">{surface.eyebrow}</p>
          <h1 className="break-words text-5xl font-semibold leading-tight md:text-6xl">{surface.title}</h1>
          <p className="break-words text-lg leading-9 text-paper/72">
            {surface.description}
          </p>
        </div>
      </section>

      <section data-gsap-reveal className="grid gap-4 md:grid-cols-2">
        {surface.rules.map((rule) => (
          <article key={rule.title} className="rounded-[1.6rem] border border-white/65 bg-white/76 p-6 shadow-soft backdrop-blur">
            <h2 className="break-words text-2xl font-semibold text-ink">{rule.title}</h2>
            <p className="mt-3 break-words text-sm leading-7 text-ink/64">{rule.description}</p>
          </article>
        ))}
      </section>

      <section data-gsap-reveal className="rounded-[2rem] border border-white/65 bg-white/74 p-7 shadow-soft backdrop-blur md:p-8">
        <p className="text-xs font-semibold tracking-[0.35em] text-moss">{surface.summaryLabel}</p>
        <p className="mt-3 break-words text-2xl font-semibold leading-relaxed text-ink">
          {surface.summaryQuote}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {surface.actions.map(action => (
            <Link key={action.href} href={action.href} className={
              action.style === 'primary' ? "rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:-translate-y-0.5" :
              action.style === 'secondary' ? "rounded-full border border-ink/10 bg-white/70 px-5 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5" :
              "rounded-full border border-ink/10 bg-white/45 px-5 py-3 text-sm font-semibold text-ink/70 transition hover:-translate-y-0.5"
            }>
              {action.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

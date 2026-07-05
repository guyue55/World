'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { Activity, ArrowRight, LockKeyhole, Radio, ShieldCheck } from 'lucide-react'
import type { DynamicWorldCapabilitySignal, DynamicWorldStatusSurface } from '@/lib/public-world-surfaces'
import { useGsapEntrance } from '@/components/world/useGsapEntrance'
import { useWorldRuntime } from '@/components/world/WorldRuntimeProvider'

const statusClass: Record<DynamicWorldCapabilitySignal['status'], string> = {
  active: 'bg-leaf/18 text-ink',
  'low-light': 'bg-gold/20 text-ink',
  guarded: 'bg-lake/18 text-ink',
  blocked: 'bg-ink/8 text-ink/62',
}

const statusIcon: Record<DynamicWorldCapabilitySignal['status'], typeof Activity> = {
  active: Activity,
  'low-light': Radio,
  guarded: ShieldCheck,
  blocked: LockKeyhole,
}

export function DynamicWorldStatusBoard({ surface }: { surface: DynamicWorldStatusSurface }) {
  const rootRef = useRef<HTMLElement | null>(null)
  const runtime = useWorldRuntime()
  const shouldMove = !runtime.reducedMotion
  useGsapEntrance(rootRef, shouldMove)

  return (
    <section ref={rootRef} className="rounded-[2rem] border border-white/65 bg-white/74 p-7 shadow-soft backdrop-blur md:p-8">
      <div data-gsap-reveal className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
        <div>
          <p className="text-xs font-semibold tracking-[0.35em] text-moss">{surface.eyebrow}</p>
          <h2 className="mt-3 break-words text-3xl font-semibold text-ink">{surface.title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/64">{surface.description}</p>
        </div>
        <div className="rounded-[1.25rem] bg-night p-5 text-paper">
          <p className="text-xs font-semibold tracking-[0.28em] text-gold">BOUNDARY</p>
          <p className="mt-3 text-lg font-semibold">{surface.runtimeLabel}</p>
          <p className="mt-2 text-sm leading-6 text-paper/62">{surface.boundaryLabel}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-4">
        {surface.metrics.map((metric) => (
          <div key={metric.label} data-gsap-reveal className="rounded-[1.15rem] bg-paper/70 p-4">
            <p className="text-3xl font-semibold text-ink">{metric.value}</p>
            <p className="mt-1 text-sm font-semibold text-ink/72">{metric.label}</p>
            <p className="mt-1 text-xs leading-5 text-ink/50">{metric.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {surface.capabilities.map((capability) => {
          const Icon = statusIcon[capability.status]
          const content = (
            <article data-gsap-reveal className="h-full rounded-[1.35rem] border border-ink/8 bg-paper/65 p-5 transition hover:-translate-y-1 hover:bg-white">
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[0.9rem] bg-ink text-paper">
                  <Icon className="h-4 w-4" />
                </span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass[capability.status]}`}>
                  {capability.statusLabel}
                </span>
              </div>
              <h3 className="mt-4 truncate text-xl font-semibold text-ink">{capability.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-7 text-ink/62">{capability.description}</p>
              {capability.href && (
                <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-moss">
                  查看页面
                  <ArrowRight className="h-4 w-4" />
                </p>
              )}
            </article>
          )

          return capability.href ? (
            <Link key={capability.id} href={capability.href} className="block">
              {content}
            </Link>
          ) : (
            <div key={capability.id}>{content}</div>
          )
        })}
      </div>
    </section>
  )
}

'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Compass, Footprints, Route, ShieldCheck, Sparkles } from 'lucide-react'
import type { PathJourneySurface } from '@/lib/public-world-surfaces'
import { useGsapEntrance } from '@/components/world/useGsapEntrance'
import { useWorldRuntime } from '@/components/world/WorldRuntimeProvider'

export function PathJourneyBoard({ surface }: { surface: PathJourneySurface }) {
  const rootRef = useRef<HTMLElement | null>(null)
  const runtime = useWorldRuntime()
  const shouldMove = !runtime.reducedMotion
  useGsapEntrance(rootRef, shouldMove)

  return (
    <section ref={rootRef} className="overflow-hidden rounded-[2rem] border border-white/65 bg-white/74 shadow-soft backdrop-blur">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative overflow-hidden bg-night p-7 text-paper md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(197,164,109,0.25),transparent_32%),radial-gradient(circle_at_82%_76%,rgba(189,207,168,0.18),transparent_34%)]" />
          <div className="relative">
            <p data-gsap-reveal className="flex items-center gap-2 text-xs font-semibold tracking-[0.35em] text-gold">
              <Route className="h-4 w-4" />
              {surface.eyebrow}
            </p>
            <h2 data-gsap-reveal className="mt-4 break-words text-3xl font-semibold leading-tight md:text-4xl">{surface.title}</h2>
            <p data-gsap-reveal className="mt-4 max-w-xl text-sm leading-7 text-paper/68">{surface.description}</p>
            <div data-gsap-reveal className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.1rem] border border-paper/12 bg-paper/8 p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-paper/82">
                  <ShieldCheck className="h-4 w-4 text-leaf" />
                  {surface.boundaryLabel}
                </p>
              </div>
              <div className="rounded-[1.1rem] border border-paper/12 bg-paper/8 p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-paper/82">
                  <Footprints className="h-4 w-4 text-gold" />
                  {surface.estimatedLabel} · {surface.audienceLabel}
                </p>
              </div>
            </div>
            <div data-gsap-reveal className="mt-5 rounded-[1.1rem] border border-paper/12 bg-paper/8 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-paper">
                <Sparkles className="h-4 w-4 text-gold" />
                旅程承诺
              </p>
              <p className="mt-2 text-sm leading-7 text-paper/66">{surface.promise}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 p-7 md:p-8">
          <div data-gsap-reveal className="grid gap-3 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-[1.2rem] border border-ink/8 bg-paper/70 p-5">
              <p className="text-sm font-semibold text-ink/72">阅读节奏</p>
              <p className="mt-2 text-lg font-semibold text-ink">{surface.rhythmLabel}</p>
            </div>
            <div className="rounded-[1.2rem] border border-ink/8 bg-paper/70 p-5">
              <p className="text-sm font-semibold text-ink/72">完成后</p>
              <p className="mt-2 text-sm leading-7 text-ink/62">{surface.completionHint}</p>
            </div>
          </div>

          <div data-gsap-reveal className="grid gap-3 sm:grid-cols-4">
            {surface.metrics.map((metric) => (
              <div key={metric.label} className="rounded-[1.1rem] bg-paper/70 p-4">
                <p className="truncate text-3xl font-semibold text-ink">{metric.value}</p>
                <p className="mt-1 text-sm font-semibold text-ink/72">{metric.label}</p>
                <p className="mt-1 text-xs leading-5 text-ink/50">{metric.note}</p>
              </div>
            ))}
          </div>

          <div data-gsap-reveal className="grid gap-3 sm:grid-cols-4">
            {surface.qualitySignals.map((signal) => (
              <div key={signal.label} className="rounded-[1.1rem] border border-moss/15 bg-moss/8 p-4">
                <p className="truncate text-2xl font-semibold text-ink">{signal.value}</p>
                <p className="mt-1 text-sm font-semibold text-ink/72">{signal.label}</p>
                <p className="mt-1 text-xs leading-5 text-ink/50">{signal.note}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-3">
            {surface.steps.slice(0, 5).map((step) => (
              <Link key={step.id} href={step.href} data-gsap-reveal className="grid min-w-0 gap-3 rounded-[1.15rem] bg-paper/70 p-4 transition hover:-translate-y-0.5 hover:bg-white sm:grid-cols-[2.75rem_minmax(0,1fr)_1rem] sm:items-center">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-xs font-semibold text-paper">
                  {step.progressLabel}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-ink">{step.title}</span>
                  <span className="mt-1 block truncate text-xs text-ink/48">{step.caption}</span>
                  <span className="mt-2 block text-xs leading-5 text-ink/58">为什么这一步：{step.whyThisStep}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-moss" />
              </Link>
            ))}
            {surface.steps.length > 5 ? (
              <p data-gsap-reveal className="rounded-[1rem] border border-ink/8 bg-white/50 px-4 py-3 text-sm leading-6 text-ink/58">
                余下 {surface.steps.length - 5} 步在下方节点序列中继续展开，避免首屏被长路径压满。
              </p>
            ) : null}
          </div>

          <div data-gsap-reveal className="rounded-[1.35rem] border border-ink/8 bg-white/55 p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink/72">
              <Compass className="h-4 w-4 text-moss" />
              走完之后
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {surface.exitActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={`rounded-[1rem] p-3 text-sm font-semibold transition ${
                    action.tone === 'primary' ? 'bg-ink text-paper hover:bg-night' : 'bg-paper/80 text-ink hover:bg-white'
                  }`}
                >
                  <span className="block">{action.label}</span>
                  <span className="mt-1 block truncate text-xs font-normal opacity-60">{action.description}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

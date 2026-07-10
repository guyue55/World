'use client'

import type { MouseEventHandler, ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, Compass, RotateCcw, ShieldCheck } from 'lucide-react'

export type WorldFallbackAction = {
  href: string
  label: string
  description?: string
  tone?: 'primary' | 'quiet'
}

export function WorldFallbackScene({
  eyebrow,
  title,
  description,
  sceneLabel,
  primaryAction,
  actions = [],
  onRetry,
  retryLabel = '重新尝试',
  children,
}: {
  eyebrow: string
  title: string
  description: string
  sceneLabel: string
  primaryAction: WorldFallbackAction
  actions?: WorldFallbackAction[]
  onRetry?: MouseEventHandler<HTMLButtonElement>
  retryLabel?: string
  children?: ReactNode
}) {
  const secondary = actions.slice(0, 3)

  return (
    <main className="world-container flex min-h-[72vh] items-center py-12 md:py-16">
      <section
        data-testid="world-fallback-scene"
        data-m29-polish="fallback-state"
        className="relative w-full overflow-hidden rounded-[1.6rem] border border-white/65 bg-[linear-gradient(118deg,rgba(37,48,42,0.96),rgba(57,73,66,0.92)_48%,rgba(24,32,35,0.96))] p-6 text-paper shadow-soft md:rounded-[2rem] md:p-8"
      >
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(247,241,230,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(247,241,230,0.10)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(197,164,109,0.20),transparent_22rem),linear-gradient(118deg,rgba(12,18,20,0.78),rgba(12,18,20,0.28))]" />

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(280px,0.55fr)] lg:items-center">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.28em] text-gold">
              <Compass className="h-4 w-4" />
              {eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl break-words text-4xl font-semibold leading-tight md:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-paper/72">{description}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={primaryAction.href}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-night shadow-soft transition hover:-translate-y-0.5 hover:bg-gold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper/80"
              >
                {primaryAction.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              {onRetry ? (
                <button
                  type="button"
                  onClick={onRetry}
                  className="inline-flex items-center gap-2 rounded-full border border-paper/18 bg-paper/10 px-5 py-3 text-sm font-semibold text-paper transition hover:-translate-y-0.5 hover:bg-paper/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper/70"
                >
                  <RotateCcw className="h-4 w-4" />
                  {retryLabel}
                </button>
              ) : null}
              {secondary.map((action) => (
                <Link
                  key={`${action.href}-${action.label}`}
                  href={action.href}
                  className="inline-flex items-center gap-2 rounded-full border border-paper/18 bg-paper/10 px-5 py-3 text-sm font-semibold text-paper transition hover:-translate-y-0.5 hover:bg-paper/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper/70"
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </div>

          <aside className="rounded-[1.2rem] border border-paper/14 bg-paper/10 p-5 backdrop-blur-xl">
            <p className="text-xs font-semibold tracking-[0.24em] text-gold">{sceneLabel}</p>
            <div className="mt-5 grid gap-3">
              <div className="rounded-[1rem] border border-paper/10 bg-paper/8 p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-paper">
                  <ShieldCheck className="h-4 w-4 text-leaf" />
                  可恢复路径
                </p>
                <p className="mt-2 text-sm leading-6 text-paper/62">任何雾区、私密门或临时错误都必须给出返回地图、档案馆、灯塔或重试入口。</p>
              </div>
              <div className="rounded-[1rem] border border-paper/10 bg-paper/8 p-4">
                <p className="text-sm font-semibold text-paper">降级规则</p>
                <p className="mt-2 text-sm leading-6 text-paper/62">reduced-motion 下保留结构、行动和说明，不依赖强动效表达状态。</p>
              </div>
              {children}
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

'use client'

import Link from 'next/link'
import { ArrowRight, Compass, History, MapPinned, Route } from 'lucide-react'
import type { NodeNextStepSurface } from '@/lib/public-world-surfaces'
import { useWorldRuntime } from '@/components/world/WorldRuntimeProvider'

export function NodeNextStepPanel({ surface }: { surface: NodeNextStepSurface }) {
  const runtime = useWorldRuntime()
  const returnJourney = runtime.lastJourney?.path?.startsWith('/node/')
    ? null
    : runtime.lastJourney

  return (
    <section className="rounded-[1.75rem] border border-white/65 bg-white/70 p-5 text-sm leading-7 text-ink/62 shadow-soft backdrop-blur">
      <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.28em] text-moss">
        <Compass className="h-4 w-4" />
        DEPARTURE
      </p>
      <p className="mt-3 text-base font-semibold text-ink">{surface.title}</p>
      <p className="mt-2">{surface.description}</p>
      {returnJourney && (
        <Link href={returnJourney.path} className="mt-4 block rounded-[1rem] border border-moss/15 bg-moss/8 px-4 py-3 font-semibold text-ink transition hover:bg-moss/12">
          <span className="block">返回来源：{returnJourney.label}</span>
          <span className="block truncate text-xs font-normal text-ink/52">{returnJourney.sceneTitle}</span>
        </Link>
      )}
      <div className="mt-4 flex flex-col gap-2">
        {surface.actions.map((action, index) => {
          const Icon = index === 0 ? MapPinned : index === 1 ? History : Route
          return (
          <Link
            key={action.href}
            href={action.href}
            className={`group flex w-full items-center justify-between gap-3 rounded-[1rem] px-4 py-3 text-left font-semibold transition ${
              action.tone === 'primary'
                ? 'bg-ink text-paper hover:bg-night'
                : 'border border-ink/10 bg-white/75 text-ink hover:bg-white'
            }`}
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${action.tone === 'primary' ? 'bg-paper text-ink' : 'bg-paper text-moss'}`}>
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block truncate">{action.label}</span>
                <span className="block truncate text-xs font-normal opacity-65">{action.description}</span>
              </span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-0.5" />
          </Link>
          )
        })}
      </div>
    </section>
  )
}

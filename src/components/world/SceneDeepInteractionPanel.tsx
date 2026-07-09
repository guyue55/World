'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Archive, ArrowRight, Clock3, Compass, Route } from 'lucide-react'
import type { SceneDeepInteractionKind, SceneDeepInteractionModel } from '@/lib/scene-deep-interaction'

const iconByKind: Record<SceneDeepInteractionKind, typeof Compass> = {
  atlas: Compass,
  timeline: Clock3,
  archive: Archive,
  paths: Route,
}

const toneByKind: Record<SceneDeepInteractionKind, string> = {
  atlas: 'from-[#15252c] via-[#26342f] to-[#10191f]',
  timeline: 'from-[#1c3132] via-[#42513f] to-[#172326]',
  archive: 'from-[#332a21] via-[#4b473a] to-[#202420]',
  paths: 'from-[#233129] via-[#46513a] to-[#162128]',
}

export function SceneDeepInteractionPanel({ model }: { model: SceneDeepInteractionModel }) {
  const [activeId, setActiveId] = useState(model.steps[0]?.id ?? '')
  const active = useMemo(
    () => model.steps.find((step) => step.id === activeId) ?? model.steps[0],
    [activeId, model.steps]
  )
  const Icon = iconByKind[model.kind]

  if (!active) return null

  return (
    <section
      data-m19-scene-interaction={model.kind}
      className={`overflow-hidden rounded-[1.8rem] border border-ink/10 bg-gradient-to-br ${toneByKind[model.kind]} text-paper shadow-soft`}
    >
      <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative overflow-hidden border-b border-paper/10 p-6 md:p-8 lg:border-b-0 lg:border-r">
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(247,241,230,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(247,241,230,0.10)_1px,transparent_1px)] [background-size:56px_56px]" />
          <div className="relative">
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.28em] text-gold">
              <Icon className="h-4 w-4" />
              {model.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">{model.title}</h2>
            <p className="mt-4 text-sm leading-7 text-paper/68">{model.description}</p>

            <div className="mt-6 grid gap-3">
              {model.stateLabels.map((label, index) => (
                <div key={label} className="flex items-center gap-3 rounded-[1rem] border border-paper/12 bg-paper/8 px-4 py-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-paper/12 text-xs font-semibold text-gold">
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold text-paper/78">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
            <div role="listbox" aria-label={model.activeLabel} className="grid gap-2">
              {model.steps.map((step) => {
                const selected = step.id === active.id
                return (
                  <button
                    key={step.id}
                    type="button"
                    aria-selected={selected}
                    onClick={() => setActiveId(step.id)}
                    className={`min-w-0 rounded-[1rem] border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 ${
                      selected
                        ? 'border-gold/45 bg-gold/16 text-paper shadow-soft'
                        : 'border-paper/12 bg-paper/8 text-paper/64 hover:border-paper/24 hover:bg-paper/12'
                    }`}
                  >
                    <span className="block truncate text-xs font-semibold tracking-[0.18em] text-gold">{step.label}</span>
                    <span className="mt-1 block truncate text-sm font-semibold">{step.title}</span>
                  </button>
                )
              })}
            </div>

            <article className="relative min-h-[18rem] overflow-hidden rounded-[1.3rem] border border-paper/14 bg-paper/10 p-5 backdrop-blur-xl">
              <div className="absolute inset-x-5 top-5 h-px bg-gradient-to-r from-gold/60 via-paper/28 to-transparent" />
              <p className="mt-4 text-xs font-semibold tracking-[0.28em] text-gold">{model.activeLabel}</p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight">{active.title}</h3>
              <p className="mt-4 text-sm leading-7 text-paper/70">{active.body}</p>
              <p className="mt-5 rounded-[1rem] border border-paper/10 bg-night/24 px-4 py-3 text-xs leading-6 text-paper/58">
                {active.meta}
              </p>
              {active.href && (
                <Link
                  href={active.href}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2.5 text-sm font-semibold text-night transition hover:-translate-y-0.5 hover:bg-gold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper/80"
                >
                  进入这个地点
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

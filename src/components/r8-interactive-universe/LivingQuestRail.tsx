'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { interactiveMainlines } from './InteractiveUniverseEngine'

export function LivingQuestRail() {
  const pathname = usePathname()
  const mainlines = useMemo(() => interactiveMainlines(), [])
  const active = mainlines.find((line) => line.steps.some((step) => step.href === pathname || pathname.startsWith(`${step.href}/`))) ?? mainlines[0]

  return (
    <nav className="pointer-events-none fixed bottom-6 left-1/2 z-[44] hidden w-[min(52rem,calc(100vw-2rem))] -translate-x-1/2 rounded-[1.75rem] border border-white/45 bg-white/55 p-3 shadow-soft backdrop-blur lg:block" aria-label="世界主线">
      <div className="pointer-events-auto grid gap-3 md:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[1.25rem] bg-ink/85 p-4 text-white">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] opacity-70">Mainline</p>
          <h2 className="mt-2 text-sm font-semibold">{active.worldName}</h2>
          <p className="mt-1 text-xs leading-5 opacity-70">{active.description}</p>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {active.steps.map((step, index) => (
            <Link
              key={step.href}
              href={step.href}
              className={`rounded-[1.1rem] border px-3 py-3 text-center text-[11px] font-semibold transition hover:-translate-y-0.5 ${pathname === step.href ? 'border-gold/60 bg-gold/20 text-gold' : 'border-white/60 bg-white/65 text-ink/60'}`}
            >
              <span className="block text-[9px] opacity-50">{String(index + 1).padStart(2, '0')}</span>
              {step.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

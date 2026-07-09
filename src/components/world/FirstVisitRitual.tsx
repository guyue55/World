'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  FIRST_VISIT_RITUAL_STORAGE_KEY,
  FIRST_VISIT_RITUAL_STORAGE_VALUE,
  getFirstVisitRitualConfig,
} from '@/lib/first-visit-ritual'
import { useWorldRuntime } from '@/components/world/WorldRuntimeProvider'

const ritual = getFirstVisitRitualConfig()

function readHasSeenRitual() {
  try {
    return window.localStorage.getItem(FIRST_VISIT_RITUAL_STORAGE_KEY) === FIRST_VISIT_RITUAL_STORAGE_VALUE
  } catch {
    return false
  }
}

function markRitualSeen() {
  try {
    window.localStorage.setItem(FIRST_VISIT_RITUAL_STORAGE_KEY, FIRST_VISIT_RITUAL_STORAGE_VALUE)
  } catch {
    // localStorage can be unavailable in strict privacy modes.
  }
}

export function FirstVisitRitual() {
  const { motionMode } = useWorldRuntime()
  const [hasSeen, setHasSeen] = useState(false)
  const [expanded, setExpanded] = useState(true)

  useEffect(() => {
    const seen = readHasSeenRitual()
    setHasSeen(seen)
    setExpanded(!seen)
  }, [])

  function closeRitual() {
    markRitualSeen()
    setHasSeen(true)
    setExpanded(false)
  }

  function openRitual() {
    setExpanded(true)
  }

  if (!expanded) {
    return (
      <section data-testid="first-visit-ritual-collapsed" className="rounded-[1.2rem] border border-white/10 bg-white/8 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] text-gold">{ritual.copy.eyebrow}</p>
            <h2 className="mt-1 text-lg font-semibold text-paper">{ritual.copy.collapsedTitle}</h2>
            <p className="mt-1 text-sm leading-6 text-paper/62">{ritual.copy.collapsedDescription}</p>
          </div>
          <button
            type="button"
            onClick={openRitual}
            className="w-fit rounded-full border border-white/12 bg-white/8 px-5 py-2.5 text-sm font-semibold text-paper/78 transition hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
          >
            重新展开入口
          </button>
        </div>
      </section>
    )
  }

  return (
    <section
      data-testid="first-visit-ritual"
      data-has-seen={hasSeen ? 'true' : 'false'}
      data-motion-mode={motionMode}
      className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/8 p-4 text-paper"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(197,164,109,0.16),transparent_9rem)]" />
      <div className="relative grid gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-gold">{ritual.copy.eyebrow}</p>
          <h2 className="mt-2 text-xl font-semibold leading-7 text-paper">
            {ritual.copy.title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-paper/68">
            {ritual.copy.description}
          </p>
          {motionMode !== 'full' && (
            <p className="mt-3 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm leading-6 text-paper/64">
              {motionMode === 'off' ? '动效已关闭：入口仪式只保留选择、跳过和返回路径。' : ritual.copy.reducedMotionNote}
            </p>
          )}
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          {ritual.actions.map((action) => (
            <Link
              key={action.id}
              href={action.href}
              onClick={markRitualSeen}
              className={action.tone === 'primary'
                ? 'group rounded-[1rem] bg-paper px-3 py-3 text-ink transition motion-safe:hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/80'
                : 'group rounded-[1rem] border border-white/10 bg-white/8 px-3 py-3 text-paper transition motion-safe:hover:-translate-y-0.5 hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/80'}
            >
              <p className={action.tone === 'primary' ? 'text-xs font-semibold tracking-[0.2em] text-moss' : 'text-xs font-semibold tracking-[0.2em] text-gold'}>
                {action.label}
              </p>
              <h3 className="mt-2 text-sm font-semibold leading-5">{action.title}</h3>
              <p className={action.tone === 'primary' ? 'mt-2 text-sm leading-6 text-ink/64' : 'mt-2 text-sm leading-6 text-paper/64'}>
                {action.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="relative mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={closeRitual}
          className="rounded-full border border-white/12 bg-white/8 px-5 py-2.5 text-sm font-semibold text-paper/78 transition hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/80"
        >
          跳过，以后不打扰
        </button>
        <span className="text-xs leading-6 text-paper/45">
          仅保存公开体验偏好，不读取私密层，也不判断权限。
        </span>
      </div>
    </section>
  )
}

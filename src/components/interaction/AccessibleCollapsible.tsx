'use client'

import { useId, useState } from 'react'
import type { ReactNode } from 'react'

type AccessibleCollapsibleProps = {
  title: string
  summary?: string
  children: ReactNode
  defaultOpen?: boolean
}

export function AccessibleCollapsible({
  title,
  summary,
  children,
  defaultOpen = false,
}: AccessibleCollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 shadow-soft">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 rounded-world px-5 py-4 text-left outline-none transition hover:bg-white/50 focus-visible:ring-2 focus-visible:ring-gold/70"
      >
        <span>
          <span className="block text-lg font-semibold">{title}</span>
          {summary && <span className="mt-1 block text-sm leading-6 text-ink/60">{summary}</span>}
        </span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink/5 text-xl">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div id={id} className="border-t border-ink/10 px-5 py-5">
          {children}
        </div>
      )}
    </section>
  )
}

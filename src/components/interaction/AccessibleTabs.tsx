'use client'

import { useId, useState } from 'react'
import type { ReactNode } from 'react'

export type AccessibleTabItem = {
  id: string
  label: string
  panel: ReactNode
}

type AccessibleTabsProps = {
  items: AccessibleTabItem[]
  defaultId?: string
  label: string
}

export function AccessibleTabs({ items, defaultId, label }: AccessibleTabsProps) {
  const generatedId = useId()
  const [activeId, setActiveId] = useState(defaultId ?? items[0]?.id)
  const active = items.find((item) => item.id === activeId) ?? items[0]

  return (
    <div className="space-y-4">
      <div role="tablist" aria-label={label} className="flex flex-wrap gap-2">
        {items.map((item) => {
          const selected = item.id === active.id
          const tabId = `${generatedId}-${item.id}-tab`
          const panelId = `${generatedId}-${item.id}-panel`

          return (
            <button
              key={item.id}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              onClick={() => setActiveId(item.id)}
              className={`rounded-full px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 ${
                selected ? 'bg-ink text-paper shadow-soft' : 'border border-ink/10 bg-white/45 text-ink/70 hover:bg-white/70'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      <div
        id={`${generatedId}-${active.id}-panel`}
        role="tabpanel"
        aria-labelledby={`${generatedId}-${active.id}-tab`}
        className="rounded-world border border-ink/10 bg-white/45 p-5 shadow-soft"
      >
        {active.panel}
      </div>
    </div>
  )
}

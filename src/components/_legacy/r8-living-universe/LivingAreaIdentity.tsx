'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useWorldRuntime } from '@/components/r8-dynamic-world'
import { resolveLivingScene } from './LivingUniverseField'

export function LivingAreaIdentity() {
  const pathname = usePathname()
  const scene = useMemo(() => resolveLivingScene(pathname), [pathname])
  const { markJourney, reducedMotion } = useWorldRuntime()
  const [open, setOpen] = useState(false)
  const isOwnerOnly = scene.visibility === 'owner-only'

  return (
    <motion.aside
      className="pointer-events-auto fixed bottom-24 left-4 z-50 w-[calc(100vw-2rem)] max-w-[25rem] overflow-hidden rounded-[2rem] border border-white/60 bg-white/82 text-ink shadow-soft backdrop-blur-xl md:bottom-5 md:left-5"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <button type="button" onClick={() => setOpen((value) => !value)} className="w-full p-4 text-left">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.32em] text-moss">AREA IDENTITY</p>
            <h2 className="mt-2 text-lg font-semibold text-ink">{scene.worldName}</h2>
            <p className="mt-1 text-xs text-ink/50">{scene.realName}</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-[10px] font-semibold ${isOwnerOnly ? 'bg-ink text-white' : 'bg-sand text-ink/60'}`}>
            {scene.visibility}
          </span>
        </div>
      </button>

      {open ? (
        <div className="border-t border-ink/10 p-4 pt-3">
          <p className="text-sm leading-7 text-ink/65">{scene.answer}</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {scene.actions.map((action, index) => (
              <motion.span
                key={action}
                className="rounded-2xl bg-sand/65 px-3 py-2 text-center text-[11px] font-semibold text-ink/58"
                animate={reducedMotion ? undefined : { y: [0, -2, 0] }}
                transition={{ duration: 3 + index, repeat: Infinity, ease: 'easeInOut' }}
              >
                {action}
              </motion.span>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            {scene.next.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => markJourney(item.href, item.label)}
                className="flex items-center justify-between rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-semibold text-ink/65 transition hover:-translate-y-0.5 hover:bg-ink hover:text-white"
              >
                <span>{item.label}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </motion.aside>
  )
}

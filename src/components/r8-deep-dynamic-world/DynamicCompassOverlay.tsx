'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Archive, Bot, Compass, Home, Map, Route, Waves } from 'lucide-react'
import { motion } from 'framer-motion'
import { useWorldRuntime } from '@/components/r8-dynamic-world'

const entries = [
  { href: '/', label: '原点', icon: Home },
  { href: '/atlas', label: '地图', icon: Map },
  { href: '/timeline', label: '时间河', icon: Waves },
  { href: '/paths', label: '路径', icon: Route },
  { href: '/archive', label: '档案', icon: Archive },
  { href: '/ask', label: '灯塔', icon: Bot },
]

export function DynamicCompassOverlay() {
  const pathname = usePathname()
  const { markJourney, reducedMotion } = useWorldRuntime()
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-5 left-5 z-50 hidden md:block">
      <motion.button
        type="button"
        className="flex h-14 w-14 items-center justify-center rounded-full border border-white/70 bg-white/82 text-ink shadow-soft backdrop-blur-xl transition hover:bg-white"
        onClick={() => setOpen(!open)}
        animate={reducedMotion ? undefined : { rotate: open ? 45 : [0, 4, -4, 0] }}
        transition={{ duration: open ? 0.2 : 4, repeat: open ? 0 : Infinity, ease: 'easeInOut' }}
        aria-label="打开世界罗盘"
      >
        <Compass className="h-5 w-5" />
      </motion.button>
      {open ? (
        <motion.nav
          className="absolute bottom-16 left-0 grid w-72 gap-2 rounded-[1.5rem] border border-white/70 bg-white/86 p-3 shadow-soft backdrop-blur-xl"
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
        >
          <p className="px-3 py-2 text-xs font-semibold tracking-[0.28em] text-ink/40">WORLD COMPASS</p>
          {entries.map((entry) => {
            const Icon = entry.icon
            const active = pathname === entry.href
            return (
              <Link
                key={entry.href}
                href={entry.href}
                onClick={() => {
                  markJourney(entry.href, entry.label)
                  setOpen(false)
                }}
                className={`flex items-center justify-between rounded-2xl px-3 py-3 text-sm font-semibold transition ${active ? 'bg-ink text-white' : 'text-ink/70 hover:bg-sand/70'}`}
              >
                <span className="flex items-center gap-2"><Icon className="h-4 w-4" />{entry.label}</span>
                <span className={active ? 'text-white/55' : 'text-ink/35'}>{active ? '当前' : '前往'}</span>
              </Link>
            )
          })}
        </motion.nav>
      ) : null}
    </div>
  )
}

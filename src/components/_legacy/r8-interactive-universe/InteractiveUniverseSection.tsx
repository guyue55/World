'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useWorldRuntime } from '@/components/_legacy/r8-dynamic-world'
import { resolveInteractiveRoute, interactiveMainlines } from './InteractiveUniverseEngine'

export function InteractiveUniverseSection() {
  const pathname = usePathname()
  const route = useMemo(() => resolveInteractiveRoute(pathname), [pathname])
  const mainlines = useMemo(() => interactiveMainlines(), [])
  const [activeAction, setActiveAction] = useState(route.actions[0])
  const { reducedMotion } = useWorldRuntime()

  return (
    <section className="rounded-[2.5rem] border border-white/60 bg-white/84 p-6 shadow-soft backdrop-blur md:p-8">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="text-xs font-semibold tracking-[0.36em] text-moss">R8.7 INTERACTIVE UNIVERSE</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">{route.worldName} 开始响应你的动作。</h2>
          <p className="mt-4 leading-8 text-ink/58">
            当前页面被识别为 {route.realName}，场景是 {route.scene}。它不再只提供说明，而是提供可触发动作、主线路径、复访记录和世界 / 现实 / 静读三种体验模式。
          </p>
          <p className="mt-3 rounded-2xl bg-sand/70 p-4 text-sm leading-7 text-ink/58">
            当前仪式：{route.ritual}。当前动作：{activeAction}。可见性边界：{route.visibility}。
          </p>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {route.actions.map((action, index) => (
              <motion.button
                key={action}
                type="button"
                onClick={() => setActiveAction(action)}
                className={`rounded-[1.4rem] border p-4 text-left transition ${activeAction === action ? 'border-gold/55 bg-gold/15 text-gold' : 'border-white/70 bg-sand/60 text-ink/62 hover:bg-white'}`}
                animate={reducedMotion ? undefined : { y: activeAction === action ? -2 : 0 }}
                transition={{ duration: 0.25, delay: index * 0.02 }}
              >
                <span className="text-xs font-semibold">{String(index + 1).padStart(2, '0')}</span>
                <span className="mt-2 block text-sm font-semibold">{action}</span>
                <span className="mt-1 block text-xs leading-5 opacity-60">让页面产生一次可感知的世界反馈。</span>
              </motion.button>
            ))}
          </div>

          <div className="rounded-[1.75rem] border border-white/70 bg-white/65 p-4">
            <p className="text-sm font-semibold text-ink">下一步路径</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {route.next.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-full bg-ink px-4 py-3 text-center text-xs font-semibold text-white transition hover:-translate-y-0.5">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            {mainlines.slice(0, 3).map((line) => (
              <div key={line.id} className="rounded-[1.35rem] border border-white/70 bg-sand/55 p-4">
                <p className="text-sm font-semibold text-ink">{line.worldName}｜{line.title}</p>
                <p className="mt-1 text-xs leading-5 text-ink/52">{line.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

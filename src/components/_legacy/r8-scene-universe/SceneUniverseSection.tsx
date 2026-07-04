'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useWorldRuntime } from '@/components/r8-dynamic-world'
import { resolveSceneRoute } from './SceneUniverseEngine'

export function SceneUniverseSection() {
  const pathname = usePathname()
  const route = useMemo(() => resolveSceneRoute(pathname), [pathname])
  const { reducedMotion } = useWorldRuntime()
  const [mode, setMode] = useState(route.defaultMode)
  const [active, setActive] = useState(route.primaryAction)

  return (
    <section className="rounded-[2.6rem] border border-white/65 bg-white/86 p-6 shadow-soft backdrop-blur md:p-8">
      <div className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr] xl:items-start">
        <div>
          <p className="text-xs font-semibold tracking-[0.36em] text-moss">R8.8 SCENE UNIVERSE</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">{route.place}</h2>
          <p className="mt-4 leading-8 text-ink/60">{route.story}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {(['world', 'reality', 'reader'] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className={`rounded-2xl px-4 py-3 text-left text-xs font-semibold transition ${mode === item ? 'bg-ink text-white' : 'bg-sand/70 text-ink/55 hover:bg-white'}`}
              >
                {item === 'world' ? '世界模式' : item === 'reality' ? '现实模式' : '静读模式'}
              </button>
            ))}
          </div>
          <p className="mt-4 rounded-2xl bg-sand/70 p-4 text-sm leading-7 text-ink/58">
            当前模式：{mode === 'world' ? '沉浸探索' : mode === 'reality' ? '高效查找' : '低干扰阅读'}。当前动作：{active}。主线任务：{route.quest}。
          </p>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-3 md:grid-cols-2">
            {[route.primaryAction, ...route.secondaryActions].map((action, index) => (
              <motion.button
                key={action}
                type="button"
                onClick={() => setActive(action)}
                className={`rounded-[1.35rem] border p-4 text-left transition ${active === action ? 'border-gold/60 bg-gold/15 text-gold' : 'border-white/70 bg-sand/60 text-ink/62 hover:bg-white'}`}
                animate={reducedMotion ? undefined : { y: active === action ? -3 : 0 }}
                transition={{ duration: 0.22, delay: index * 0.02 }}
              >
                <span className="text-xs font-semibold">{String(index + 1).padStart(2, '0')}</span>
                <span className="mt-2 block text-sm font-semibold">{action}</span>
                <span className="mt-1 block text-xs leading-5 opacity-60">一次世界内动作，而不是普通按钮点击。</span>
              </motion.button>
            ))}
          </div>

          <div className="rounded-[1.75rem] border border-white/70 bg-white/62 p-4">
            <p className="text-sm font-semibold text-ink">场景物件</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {route.sceneObjects.map((item) => (
                <span key={item} className="rounded-full bg-ink/5 px-3 py-1 text-xs font-semibold text-ink/48">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/70 bg-sand/56 p-4">
            <p className="text-sm font-semibold text-ink">继续路径</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {route.next.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-full bg-ink px-4 py-3 text-center text-xs font-semibold text-white transition hover:-translate-y-0.5">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

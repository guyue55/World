'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Compass, Lightbulb, Map, Waves } from 'lucide-react'
import { getR8DynamicSummary } from '@/features/r8-dynamic-world'
import { useWorldRuntime } from './WorldRuntimeProvider'

const summary = getR8DynamicSummary()

const entrances = [
  { href: '/atlas', label: '打开地图', icon: Map, description: '观测主区域与深层入口' },
  { href: '/timeline', label: '沿时间河', icon: Waves, description: '查看世界如何生长' },
  { href: '/ask', label: '点亮灯塔', icon: Lightbulb, description: '询问公开导览与路径建议' },
  { href: '/archive', label: '进入档案馆', icon: Compass, description: '切换现实查找模式' },
]

export function DynamicWorldHero() {
  const { lastJourney, markJourney, reducedMotion } = useWorldRuntime()

  return (
    <section className="relative min-h-[760px] overflow-hidden rounded-[3rem] border border-white/70 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.98),rgba(247,241,230,0.88)_34%,rgba(125,154,162,0.28)_70%,rgba(23,33,29,0.14)_100%)] p-6 shadow-soft md:p-10">
      <motion.div
        className="absolute left-8 top-10 h-48 w-72 rounded-[2rem] border border-white/55 bg-white/35 shadow-soft backdrop-blur"
        animate={reducedMotion ? undefined : { y: [0, -10, 0], rotate: [-1, 1, -1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-16 right-8 h-64 w-64 rounded-full border border-white/40 bg-[radial-gradient(circle,rgba(255,255,255,0.82),rgba(197,164,109,0.22)_45%,transparent_70%)] blur-[1px]"
        animate={reducedMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-paper/85 to-transparent" aria-hidden="true" />

      <div className="relative z-10 grid min-h-[700px] items-end gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl pb-10"
        >
          <p className="text-xs font-semibold tracking-[0.38em] text-moss">R8.1 DYNAMIC WORLD</p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight text-ink md:text-7xl">
            一张书桌亮起，星河开始回应。
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-9 text-ink/70">
            这一次不再只是说明“这里是一个世界”，而是让首页自己成为抵达仪式：光、纸页、地图、灯塔、继续旅程与渐进显现一起工作。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {entrances.map((entry) => {
              const Icon = entry.icon
              return (
                <Link
                  key={entry.href}
                  href={entry.href}
                  className="group rounded-2xl bg-ink px-5 py-4 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-1 hover:bg-night"
                  onClick={() => markJourney(entry.href, entry.label)}
                >
                  <span className="flex items-center gap-2"><Icon className="h-4 w-4" />{entry.label}</span>
                  <span className="mt-1 block text-xs font-normal text-white/62">{entry.description}</span>
                </Link>
              )
            })}
          </div>
          {lastJourney ? (
            <Link href={lastJourney.path} className="mt-5 inline-flex rounded-2xl border border-ink/10 bg-white/55 px-5 py-3 text-sm font-semibold text-ink/75 backdrop-blur transition hover:bg-white">
              继续上次旅程：{lastJourney.label}
            </Link>
          ) : null}
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative mb-10 rounded-[2rem] border border-white/65 bg-white/60 p-5 shadow-soft backdrop-blur-xl"
        >
          <p className="text-xs font-semibold tracking-[0.28em] text-ink/45">WORLD RUNTIME</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-3xl bg-white/70 p-4"><p className="text-3xl font-semibold">{summary.surfaces}</p><p className="text-xs text-ink/55">动态界面</p></div>
            <div className="rounded-3xl bg-white/70 p-4"><p className="text-3xl font-semibold">{summary.acceptanceItems}</p><p className="text-xs text-ink/55">验收标准</p></div>
            <div className="rounded-3xl bg-white/70 p-4"><p className="text-3xl font-semibold">{summary.stages}</p><p className="text-xs text-ink/55">阶段</p></div>
            <div className="rounded-3xl bg-white/70 p-4"><p className="text-3xl font-semibold">{summary.batches}</p><p className="text-xs text-ink/55">批次</p></div>
          </div>
          <p className="mt-5 text-sm leading-7 text-ink/62">前端动态化不依赖后端：当前先让世界会呼吸、可聚焦、可展开、可继续旅程，再接真实数据库和 AI。</p>
        </motion.div>
      </div>
    </section>
  )
}

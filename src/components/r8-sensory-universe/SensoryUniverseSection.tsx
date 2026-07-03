'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { resolveSensoryScene } from './SensoryUniverseEngine'
import { useWorldRuntime } from '@/components/r8-dynamic-world'

export function SensoryUniverseSection() {
  const pathname = usePathname()
  const scene = useMemo(() => resolveSensoryScene(pathname), [pathname])
  const { reducedMotion } = useWorldRuntime()
  const layers = [
    { title: '近景器物', values: scene.near, description: '让世界有手感，不只是背景图。' },
    { title: '中景功能', values: scene.middle, description: '承载真实导航、阅读、路径和整理。' },
    { title: '远景未知', values: scene.far, description: '保留浩瀚、未来、雾区和探索欲。' },
  ]

  return (
    <section className="rounded-[2.5rem] border border-white/60 bg-white/82 p-6 shadow-soft backdrop-blur md:p-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold tracking-[0.36em] text-moss">R8.6 SENSORY UNIVERSE</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">{scene.title} 不再只是页面。</h2>
          <p className="mt-4 leading-8 text-ink/58">
            当前抵达 {scene.place}，天气为 {scene.weather}。本页通过近景、中景、远景、动作仪式和低干扰反馈，把信息结构继续变成可进入的真实宇宙场景。
          </p>
          <p className="mt-3 leading-8 text-ink/58">感官提示：{scene.soundHint}。在 reduced-motion 下保留文本、路径和区域说明，关闭高频动画。</p>
        </div>
        <div className="grid gap-3">
          {layers.map((layer, index) => (
            <motion.div
              key={layer.title}
              className="rounded-[1.5rem] border border-white/70 bg-sand/60 p-4"
              animate={reducedMotion ? undefined : { y: [0, -3 - index, 0] }}
              transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="text-sm font-semibold text-ink">{layer.title}</p>
              <p className="mt-1 text-sm leading-6 text-ink/54">{layer.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {layer.values.map((item) => (
                  <span key={item} className="rounded-full bg-white/75 px-3 py-1 text-xs text-ink/54">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
          <div className="grid gap-2 sm:grid-cols-2">
            {scene.next.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-full bg-ink px-4 py-3 text-center text-xs font-semibold text-white transition hover:-translate-y-0.5">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

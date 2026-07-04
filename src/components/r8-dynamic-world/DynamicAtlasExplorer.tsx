'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getR2GatewayCards } from '@/features/r2-world-experience'
import { useWorldRuntime } from './WorldRuntimeProvider'

const cards = getR2GatewayCards()

const coordinates = [
  { x: 48, y: 18 },
  { x: 22, y: 35 },
  { x: 68, y: 34 },
  { x: 36, y: 54 },
  { x: 78, y: 58 },
  { x: 18, y: 70 },
  { x: 56, y: 76 },
]

export function DynamicAtlasExplorer() {
  const { markJourney, reducedMotion } = useWorldRuntime()
  const [activeId, setActiveId] = useState(cards[0]?.id ?? '')
  const activeCard = useMemo(() => cards.find((card) => card.id === activeId) ?? cards[0], [activeId])

  return (
    <section className="rounded-[2.5rem] border border-white/70 bg-white/80 p-6 shadow-soft md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.32em] text-moss">INTERACTIVE ATLAS</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">地图不再只是卡片列表。</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/62">点击区域会聚焦对应星屿、显示现实解释和下一步路径。入口保持少，深处才展开。</p>
        </div>
        {activeCard ? (
          <Link
            href={activeCard.href}
            onClick={() => markJourney(activeCard.href, activeCard.worldName)}
            className="rounded-2xl bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            进入 {activeCard.worldName}
          </Link>
        ) : null}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/60 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.86),rgba(125,154,162,0.16)_48%,rgba(23,33,29,0.06)_100%)]">
          <div className="absolute inset-8 rounded-[2rem] border border-dashed border-ink/10" />
          {cards.map((card, index) => {
            const point = coordinates[index % coordinates.length]
            const isActive = card.id === activeId
            return (
              <motion.button
                key={card.id}
                type="button"
                className={`absolute rounded-full border px-4 py-3 text-left shadow-soft backdrop-blur transition ${isActive ? 'border-ink bg-ink text-white' : 'border-white/70 bg-white/72 text-ink hover:bg-white'}`}
                style={{ left: `${point.x}%`, top: `${point.y}%`, transform: 'translate(-50%, -50%)' }}
                animate={reducedMotion ? undefined : { y: isActive ? [0, -5, 0] : [0, -2, 0], scale: isActive ? 1.08 : 1 }}
                transition={{ duration: 4, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
                onClick={() => setActiveId(card.id)}
              >
                <span className="block text-sm font-semibold">{card.worldName}</span>
                <span className={`block text-xs ${isActive ? 'text-white/65' : 'text-ink/45'}`}>{card.realName}</span>
              </motion.button>
            )
          })}
        </div>

        <div className="rounded-[2rem] border border-white/60 bg-sand/50 p-6">
          <p className="text-xs font-semibold tracking-[0.28em] text-ink/45">FOCUSED AREA</p>
          {activeCard ? (
            <>
              <h3 className="mt-3 text-3xl font-semibold text-ink">{activeCard.worldName}</h3>
              <p className="mt-2 text-sm text-ink/50">{activeCard.realName}</p>
              <p className="mt-5 leading-8 text-ink/66">{activeCard.description}</p>
              <div className="mt-6 grid gap-3">
                <button type="button" className="rounded-2xl bg-white/70 px-4 py-3 text-left text-sm font-semibold text-ink transition hover:bg-white" onClick={() => setActiveId(cards[(cards.findIndex((card) => card.id === activeId) + 1) % cards.length]?.id ?? activeId)}>
                  观测下一个区域
                </button>
                <Link href="/paths" className="rounded-2xl bg-white/70 px-4 py-3 text-sm font-semibold text-ink transition hover:bg-white">
                  查看与它相连的精选路径
                </Link>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  )
}

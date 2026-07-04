'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useWorldRuntime } from '@/components/r8-dynamic-world'
import { getNodeLives } from './types'

function stageLabel(stage: string) {
  const map: Record<string, string> = {
    seed: '种子',
    sprout: '新芽',
    growing: '生长',
    bloom: '盛放',
    fruit: '结果',
    archive: '归档',
    relic: '遗迹',
  }
  return map[stage] ?? stage
}

export function NodeLifeConstellation() {
  const nodes = getNodeLives()
  const { reducedMotion } = useWorldRuntime()
  const [active, setActive] = useState(nodes[0]?.id ?? '')
  const node = nodes.find((item) => item.id === active) ?? nodes[0]

  return (
    <section className="rounded-[2.6rem] border border-white/65 bg-white/82 p-6 shadow-soft backdrop-blur md:p-8">
      <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
        <div>
          <p className="text-xs font-semibold tracking-[0.36em] text-gold">NODE LIFE</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">节点不是文章，而是世界生命体</h2>
          <p className="mt-4 leading-8 text-ink/60">每个节点都拥有现实标题、世界标题、来源、权限、生命阶段、成熟度、关系语义和下一步动作。这样世界可以浪漫呈现，也能长期维护和审计。</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {nodes.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                className={`rounded-[1.5rem] border p-4 text-left transition ${active === item.id ? 'border-gold/60 bg-gold/14' : 'border-white/70 bg-sand/55 hover:bg-white'}`}
                animate={reducedMotion ? undefined : { y: active === item.id ? -4 : 0 }}
                transition={{ duration: 0.22, delay: index * 0.02 }}
              >
                <span className="text-[11px] font-semibold text-ink/40">{stageLabel(item.stage)} · {item.maturity}%</span>
                <span className="mt-2 block text-sm font-semibold text-ink">{item.worldTitle}</span>
                <span className="mt-1 block text-xs leading-5 text-ink/52">{item.realTitle}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/70 bg-sand/58 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-[0.28em] text-moss">NODE PASSPORT</p>
              <h3 className="mt-2 text-2xl font-semibold text-ink">{node.worldTitle}</h3>
              <p className="mt-1 text-sm text-ink/55">{node.realTitle}</p>
            </div>
            <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">{node.visibility}</span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/65 p-4">
              <p className="text-xs font-semibold text-ink/40">位置</p>
              <p className="mt-1 text-sm font-semibold text-ink">{node.area}</p>
            </div>
            <div className="rounded-2xl bg-white/65 p-4">
              <p className="text-xs font-semibold text-ink/40">来源 / 可信层</p>
              <p className="mt-1 text-sm font-semibold text-ink">{node.origin} · {node.trust}</p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-white/65 p-4">
            <p className="text-xs font-semibold text-ink/40">成长轨迹</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {node.growth.map((item) => (
                <span key={item} className="rounded-full bg-moss/10 px-3 py-1 text-xs font-semibold text-moss">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-white/65 p-4">
            <p className="text-xs font-semibold text-ink/40">关系说明</p>
            <div className="mt-3 grid gap-2">
              {node.relations.map((item) => (
                <p key={item} className="rounded-xl bg-ink/5 px-3 py-2 text-xs font-semibold text-ink/58">{item}</p>
              ))}
            </div>
          </div>

          <p className="mt-4 rounded-2xl bg-ink p-4 text-sm font-semibold leading-7 text-white">下一步：{node.nextAction}</p>
        </div>
      </div>
    </section>
  )
}

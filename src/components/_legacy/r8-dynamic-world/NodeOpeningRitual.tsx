'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { getR3FeaturedNodes } from '@/features/_legacy/r3-content-life'
import { useWorldRuntime } from './WorldRuntimeProvider'

const nodes = getR3FeaturedNodes(6)

const ritualByType: Record<string, string> = {
  article: '纸页靠近，世界退远，进入静读。',
  project: '工坊装置点亮，状态、证据和复盘浮现。',
  idea: '种子从云层落下，等待继续生长。',
  memory: '光片落入记忆湖，时间泛起涟漪。',
  doc: '卷宗打开，目录与证据链浮现。',
}

export function NodeOpeningRitual() {
  const { markJourney, reducedMotion } = useWorldRuntime()
  const [activeId, setActiveId] = useState(nodes[0]?.id ?? '')
  const activeNode = useMemo(() => nodes.find((node) => node.id === activeId) ?? nodes[0], [activeId])

  return (
    <section className="rounded-[2.5rem] border border-white/70 bg-white/80 p-6 shadow-soft md:p-8">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.32em] text-moss">NODE OPENING</p>
        <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">节点不是普通链接，而是一次展开。</h2>
        <p className="mt-3 text-sm leading-7 text-ink/62">当前先在首页演示“节点护照 + 展开反馈”，后续可用于真实节点详情页转场。</p>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="grid gap-3">
          {nodes.map((node) => (
            <button
              key={node.id}
              type="button"
              className={`rounded-2xl p-4 text-left transition ${node.id === activeId ? 'bg-ink text-white shadow-soft' : 'bg-sand/60 text-ink hover:bg-white'}`}
              onClick={() => {
                setActiveId(node.id)
                markJourney(`/archive?node=${node.slug}`, node.worldTitle)
              }}
            >
              <span className="block text-sm font-semibold">{node.worldTitle}</span>
              <span className={`mt-1 block text-xs ${node.id === activeId ? 'text-white/65' : 'text-ink/50'}`}>{node.title} · {node.lifeStage}</span>
            </button>
          ))}
        </div>
        {activeNode ? (
          <motion.article
            key={activeNode.id}
            className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.84),rgba(247,241,230,0.65))] p-6 shadow-soft"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.96, rotateX: 5 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/20 blur-3xl" aria-hidden="true" />
            <p className="text-xs font-semibold tracking-[0.28em] text-ink/40">NODE PASSPORT</p>
            <h3 className="mt-4 text-3xl font-semibold text-ink">{activeNode.worldTitle}</h3>
            <p className="mt-2 text-sm text-ink/50">现实标题：{activeNode.title}</p>
            <p className="mt-5 rounded-2xl bg-white/55 p-4 text-sm leading-7 text-ink/62">{ritualByType[activeNode.type] ?? '节点显现，关系与下一步动作浮现。'}</p>
            <dl className="mt-5 grid gap-3 text-sm md:grid-cols-2">
              <div className="rounded-2xl bg-white/55 p-4"><dt className="text-ink/45">区域</dt><dd className="mt-1 font-semibold text-ink">{activeNode.area}</dd></div>
              <div className="rounded-2xl bg-white/55 p-4"><dt className="text-ink/45">权限</dt><dd className="mt-1 font-semibold text-ink">{activeNode.visibility}</dd></div>
              <div className="rounded-2xl bg-white/55 p-4"><dt className="text-ink/45">成熟度</dt><dd className="mt-1 font-semibold text-ink">{activeNode.maturity}%</dd></div>
              <div className="rounded-2xl bg-white/55 p-4"><dt className="text-ink/45">下一步</dt><dd className="mt-1 font-semibold text-ink">{activeNode.nextAction}</dd></div>
            </dl>
          </motion.article>
        ) : null}
      </div>
    </section>
  )
}

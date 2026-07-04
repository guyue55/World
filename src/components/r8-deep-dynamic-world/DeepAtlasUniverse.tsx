'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Area, Node } from '@/lib/types'
import { useWorldRuntime } from '@/components/r8-dynamic-world'

const positions = [
  { x: 50, y: 16 },
  { x: 22, y: 34 },
  { x: 72, y: 32 },
  { x: 48, y: 48 },
  { x: 18, y: 66 },
  { x: 54, y: 72 },
  { x: 80, y: 64 },
  { x: 50, y: 86 },
]

function countNodes(areaId: string, nodes: Node[]) {
  return nodes.filter((node) => node.areaId === areaId).length
}

export function DeepAtlasUniverse({ areas, nodes }: { areas: Area[]; nodes: Node[] }) {
  const { markJourney, reducedMotion } = useWorldRuntime()
  const [activeId, setActiveId] = useState(areas[0]?.id ?? '')
  const [zoom, setZoom] = useState<'near' | 'middle' | 'far'>('middle')
  const activeArea = useMemo(() => areas.find((area) => area.id === activeId) ?? areas[0], [activeId, areas])
  const activeNodes = useMemo(() => nodes.filter((node) => node.areaId === activeArea?.id).slice(0, 6), [activeArea?.id, nodes])
  const zoomScale = zoom === 'near' ? 1.15 : zoom === 'far' ? 0.86 : 1

  return (
    <section className="rounded-[2.8rem] border border-white/70 bg-white/78 p-6 shadow-soft backdrop-blur md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.36em] text-moss">LIVING ATLAS</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink md:text-5xl">世界地图进入可观测宇宙态。</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/62">点击星屿聚焦区域；切换近景、中景、远景，地图会保留主干少、枝叶深的秩序。</p>
        </div>
        <div className="flex gap-2 rounded-full bg-sand/65 p-1">
          {(['near', 'middle', 'far'] as const).map((item) => (
            <button key={item} type="button" onClick={() => setZoom(item)} className={`rounded-full px-4 py-2 text-xs font-semibold transition ${zoom === item ? 'bg-ink text-white' : 'text-ink/55 hover:bg-white/70'}`}>
              {item === 'near' ? '近景' : item === 'middle' ? '中景' : '远景'}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_360px]">
        <div className="relative min-h-[620px] overflow-hidden rounded-[2.4rem] border border-white/60 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.92),rgba(125,154,162,0.18)_45%,rgba(23,33,29,0.08)_100%)]">
          <motion.div className="absolute inset-0" animate={reducedMotion ? undefined : { scale: zoomScale }} transition={{ duration: 0.45 }}>
            <div className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-ink/10" />
            <div className="absolute left-1/2 top-1/2 h-[44%] w-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gold/25" />
            {areas.map((area, index) => {
              const point = positions[index % positions.length]
              const active = area.id === activeArea?.id
              const nodeCount = countNodes(area.id, nodes)
              return (
                <motion.button
                  key={area.id}
                  type="button"
                  className={`absolute max-w-[14rem] rounded-[1.4rem] border px-4 py-3 text-left shadow-soft backdrop-blur transition ${active ? 'border-ink bg-ink text-white' : 'border-white/70 bg-white/72 text-ink hover:bg-white'}`}
                  style={{ left: `${point.x}%`, top: `${point.y}%`, transform: 'translate(-50%, -50%)' }}
                  animate={reducedMotion ? undefined : { y: active ? [0, -8, 0] : [0, -3, 0], scale: active ? 1.08 : 1 }}
                  transition={{ duration: 4 + index * 0.12, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
                  onClick={() => setActiveId(area.id)}
                >
                  <span className="block text-sm font-semibold">{area.worldName}</span>
                  <span className={`mt-1 block text-xs ${active ? 'text-white/64' : 'text-ink/45'}`}>{area.realName}</span>
                  <span className={`mt-2 block text-[11px] ${active ? 'text-white/50' : 'text-ink/35'}`}>{nodeCount} 个公开节点 · L{area.level}</span>
                </motion.button>
              )
            })}
          </motion.div>
        </div>

        <aside className="rounded-[2rem] border border-white/60 bg-sand/55 p-6">
          {activeArea ? (
            <>
              <p className="text-xs font-semibold tracking-[0.28em] text-ink/42">FOCUSED STAR ISLAND</p>
              <h3 className="mt-3 text-3xl font-semibold text-ink">{activeArea.worldName}</h3>
              <p className="mt-2 text-sm text-ink/50">{activeArea.realName}</p>
              <p className="mt-5 text-sm leading-7 text-ink/64">{activeArea.description}</p>
              <div className="mt-6 space-y-3">
                {activeNodes.length > 0 ? activeNodes.map((node) => (
                  <Link key={node.id} href={`/node/${node.slug}`} onClick={() => markJourney(`/node/${node.slug}`, node.worldTitle ?? node.title)} className="block rounded-2xl bg-white/72 p-4 transition hover:-translate-y-0.5 hover:bg-white">
                    <span className="block text-sm font-semibold text-ink">{node.worldTitle ?? node.title}</span>
                    <span className="mt-1 block text-xs text-ink/45">{node.type} · {node.lifeStage}</span>
                  </Link>
                )) : <p className="rounded-2xl bg-white/60 p-4 text-sm text-ink/55">这个区域仍在低光中，等待更多公开节点。</p>}
              </div>
            </>
          ) : null}
        </aside>
      </div>
    </section>
  )
}

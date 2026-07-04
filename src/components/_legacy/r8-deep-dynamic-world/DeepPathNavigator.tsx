'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { Node, Path } from '@/lib/types'
import { useWorldRuntime } from '@/components/r8-dynamic-world'

export function DeepPathNavigator({ paths, nodes }: { paths: Path[]; nodes: Node[] }) {
  const { markJourney } = useWorldRuntime()
  const [activeId, setActiveId] = useState(paths[0]?.id ?? '')
  const [step, setStep] = useState(0)
  const activePath = useMemo(() => paths.find((path) => path.id === activeId) ?? paths[0], [activeId, paths])
  const pathNodes = useMemo(() => activePath?.nodeSlugs.map((slug) => nodes.find((node) => node.slug === slug)).filter((node): node is Node => Boolean(node)) ?? [], [activePath, nodes])
  const activeNode = pathNodes[step] ?? pathNodes[0]

  return (
    <section className="rounded-[2.8rem] border border-white/70 bg-white/78 p-6 shadow-soft backdrop-blur md:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.36em] text-moss">JOURNEY PLANNER</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink md:text-5xl">路径不再只是 Tab，而是旅程。</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/62">选择一条路，逐步点亮节点；访客能知道从哪里开始、下一步去哪、什么时候回到地图。</p>
        </div>
      </div>
      <div className="mt-8 grid gap-6 xl:grid-cols-[23rem_minmax(0,1fr)]">
        <div className="space-y-3">
          {paths.map((path) => (
            <button key={path.id} type="button" onClick={() => { setActiveId(path.id); setStep(0) }} className={`w-full rounded-[1.4rem] border p-4 text-left transition ${activePath?.id === path.id ? 'border-ink bg-ink text-white' : 'border-white/70 bg-white/70 text-ink hover:bg-white'}`}>
              <span className="block text-sm font-semibold">{path.title}</span>
              <span className={`mt-1 block text-xs ${activePath?.id === path.id ? 'text-white/60' : 'text-ink/45'}`}>{path.audience} · {path.estimatedMinutes ?? 8} min</span>
            </button>
          ))}
        </div>
        <div className="rounded-[2rem] border border-white/60 bg-sand/55 p-6">
          {activePath ? (
            <>
              <p className="text-xs font-semibold tracking-[0.28em] text-ink/42">ACTIVE PATH</p>
              <h3 className="mt-3 text-3xl font-semibold text-ink">{activePath.title}</h3>
              <p className="mt-3 text-sm leading-7 text-ink/62">{activePath.description}</p>
              <div className="mt-6 grid gap-3 md:grid-cols-[1fr_12rem]">
                <div className="rounded-2xl bg-white/70 p-5">
                  <p className="text-xs font-semibold tracking-[0.24em] text-moss">STEP {Math.min(step + 1, pathNodes.length)} / {pathNodes.length}</p>
                  <h4 className="mt-3 text-2xl font-semibold text-ink">{activeNode?.worldTitle ?? activeNode?.title ?? '等待节点'}</h4>
                  <p className="mt-3 text-sm leading-7 text-ink/58">{activeNode?.summary ?? '这条路径仍在整理。'}</p>
                  {activeNode ? <Link href={`/node/${activeNode.slug}`} onClick={() => markJourney(`/node/${activeNode.slug}`, activeNode.worldTitle ?? activeNode.title)} className="mt-5 inline-flex rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white">展开这一节点</Link> : null}
                </div>
                <div className="grid gap-2">
                  {pathNodes.map((node, index) => (
                    <button key={node.id} type="button" onClick={() => setStep(index)} className={`rounded-2xl px-3 py-3 text-left text-xs font-semibold transition ${index === step ? 'bg-ink text-white' : 'bg-white/70 text-ink/55 hover:bg-white'}`}>
                      {index + 1}. {node.worldTitle ?? node.title}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  )
}

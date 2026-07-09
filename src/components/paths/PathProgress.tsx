'use client'

import Link from 'next/link'
import type { Node } from '@/lib/types'
import { useWorldRuntime } from '@/components/world/WorldRuntimeProvider'

export function PathProgress({ nodes, pathId }: { nodes: Node[]; pathId: string }) {
  const runtime = useWorldRuntime()
  const visitedNodeSlugs = new Set(runtime.journeyHistory.map((entry) => entry.recentNodeSlug).filter(Boolean))
  const visitedNodes = nodes.filter((node) => visitedNodeSlugs.has(node.slug))
  const nextNode = nodes.find((node) => !visitedNodeSlugs.has(node.slug)) ?? nodes[0]
  const isCurrentPath = runtime.currentJourney?.recentPathId === pathId

  return (
    <aside className="rounded-world border border-ink/10 bg-white/45 p-5 shadow-soft">
      <h2 className="text-lg font-semibold">路径进度</h2>
      <p className="mt-2 text-sm leading-6 text-ink/55">
        {isCurrentPath ? '你正在这条路线里。' : '这条路线会被记录为公开旅程，方便稍后继续。'}
      </p>
      <div className="mt-4 rounded-[1rem] bg-paper/70 p-4 text-sm leading-6 text-ink/60">
        <p>已走节点：{visitedNodes.length} / {nodes.length}</p>
        {nextNode ? (
          <Link href={`/node/${nextNode.slug}`} className="mt-2 block truncate font-semibold text-ink transition hover:text-moss">
            下一站：{nextNode.worldTitle ?? nextNode.title}
          </Link>
        ) : null}
      </div>
      <ol className="mt-5 space-y-3">
        {nodes.map((node, index) => (
          <li key={node.id} className="flex gap-3 text-sm">
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs ${
              visitedNodeSlugs.has(node.slug) ? 'bg-ink text-paper' : 'bg-ink/10 text-ink'
            }`}>
              {index + 1}
            </span>
            <span className="leading-7 text-ink/70">{node.worldTitle ?? node.title}</span>
          </li>
        ))}
      </ol>
    </aside>
  )
}

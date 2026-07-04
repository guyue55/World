'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import type { Area, Node } from '@/lib/types'
import { useWorldRuntime } from '@/components/r8-dynamic-world'

const lifeLabels: Record<string, string> = {
  seed: '种子',
  sprout: '新芽',
  growing: '生长',
  bloom: '盛放',
  fruit: '结果',
  archive: '归档',
  relic: '遗迹',
  dormant: '休眠',
  silent: '静默',
}

export function ImmersiveNodeReader({ node, area, relatedNodes }: { node: Node; area?: Area; relatedNodes: Node[] }) {
  const { markJourney } = useWorldRuntime()
  const [progress, setProgress] = useState(0)
  const [passportOpen, setPassportOpen] = useState(true)

  useEffect(() => {
    markJourney(`/node/${node.slug}`, node.worldTitle ?? node.title)
    function handleScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max <= 0 ? 0 : Math.min(100, Math.round((window.scrollY / max) * 100)))
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [markJourney, node.slug, node.title, node.worldTitle])

  const fallbackRelations = useMemo(() => relatedNodes.filter((item) => item.id !== node.id).slice(0, 5), [node.id, relatedNodes])

  return (
    <aside className="space-y-4">
      <div className="overflow-hidden rounded-[1.6rem] border border-white/70 bg-white/80 p-4 shadow-soft backdrop-blur">
        <div className="flex items-center justify-between text-xs font-semibold text-ink/45">
          <span>READING ORBIT</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/8">
          <div className="h-full rounded-full bg-ink transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="rounded-[1.6rem] border border-white/70 bg-white/80 p-4 shadow-soft backdrop-blur">
        <button type="button" className="flex w-full items-center justify-between text-left" onClick={() => setPassportOpen(!passportOpen)}>
          <span className="text-sm font-semibold text-ink">节点护照 · 动态层</span>
          <span className="text-xs text-ink/45">{passportOpen ? '收起' : '展开'}</span>
        </button>
        {passportOpen ? (
          <dl className="mt-4 space-y-3 text-sm">
            <div><dt className="text-xs text-ink/40">世界标题</dt><dd className="font-semibold text-ink">{node.worldTitle ?? node.title}</dd></div>
            <div><dt className="text-xs text-ink/40">现实标题</dt><dd className="text-ink/65">{node.title}</dd></div>
            <div><dt className="text-xs text-ink/40">位置</dt><dd className="text-ink/65">{area?.worldName ?? node.areaId}</dd></div>
            <div><dt className="text-xs text-ink/40">生命阶段</dt><dd className="text-ink/65">{lifeLabels[node.lifeStage] ?? node.lifeStage}</dd></div>
            <div><dt className="text-xs text-ink/40">权限</dt><dd className="text-ink/65">{node.visibility}</dd></div>
          </dl>
        ) : null}
      </div>
      <div className="rounded-[1.6rem] border border-white/70 bg-white/80 p-4 shadow-soft backdrop-blur">
        <p className="text-sm font-semibold text-ink">关系星线</p>
        <div className="mt-3 space-y-2">
          {fallbackRelations.map((related) => (
            <Link key={related.id} href={`/node/${related.slug}`} onClick={() => markJourney(`/node/${related.slug}`, related.worldTitle ?? related.title)} className="block rounded-2xl bg-sand/60 p-3 text-sm text-ink/64 transition hover:bg-white">
              {related.worldTitle ?? related.title}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}

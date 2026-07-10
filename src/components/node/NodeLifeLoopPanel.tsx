import Link from 'next/link'
import { Archive, Compass, Map, Route, Sparkles } from 'lucide-react'
import type { ContentLifeAbsorptionScene, ContentLifeLoopFact } from '@/lib/content-life'

const sceneMeta = {
  atlas: { label: '地图', href: '/atlas', icon: Map },
  timeline: { label: '时间河', href: '/timeline', icon: Compass },
  archive: { label: '档案馆', href: '/archive', icon: Archive },
  paths: { label: '路径', href: '/paths', icon: Route },
  lighthouse: { label: '灯塔', href: '/ask', icon: Sparkles },
} as const

export function NodeLifeLoopPanel({ fact }: { fact: ContentLifeLoopFact }) {
  const scenes = Object.entries(sceneMeta) as Array<[ContentLifeAbsorptionScene, (typeof sceneMeta)[ContentLifeAbsorptionScene]]>

  return (
    <section data-testid="node-life-loop-panel" className="rounded-[1.75rem] border border-moss/16 bg-white/76 p-6 shadow-soft backdrop-blur">
      <p className="text-xs font-semibold tracking-[0.28em] text-moss">LIFE LOOP · 内容生命循环</p>
      <h2 className="mt-3 text-2xl font-semibold text-ink">这个地点正在被世界吸收</h2>
      <p className="mt-2 text-sm leading-7 text-ink/62">
        一个节点不是孤立文章。它会进入地图、时间河、档案馆、路径和灯塔事实源；缺口也会直接暴露，方便作者继续养世界。
      </p>
      <div className="mt-5 grid gap-2">
        {scenes.map(([scene, meta]) => {
          const active = fact.absorptionScenes.includes(scene)
          const Icon = meta.icon
          const detail = fact.authorImpactScope[scene]

          return (
            <Link
              key={scene}
              href={meta.href}
              data-content-life-loop-scene={scene}
              data-content-life-loop-active={active ? 'true' : 'false'}
              className={`flex items-start gap-3 rounded-[1.1rem] border px-4 py-3 transition ${
                active
                  ? 'border-moss/18 bg-moss/8 hover:bg-moss/12'
                  : 'border-ink/8 bg-paper/62 hover:bg-paper/80'
              }`}
            >
              <span className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full ${active ? 'bg-moss text-paper' : 'bg-ink/6 text-ink/45'}`}>
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-ink">{meta.label}</span>
                  <span className={active ? 'text-xs font-semibold text-moss' : 'text-xs font-semibold text-ink/40'}>
                    {active ? '已吸收' : '待补齐'}
                  </span>
                </span>
                <span className="mt-1 block text-sm leading-6 text-ink/58">{detail}</span>
              </span>
            </Link>
          )
        })}
      </div>
      <div className="mt-5 rounded-[1rem] bg-paper/70 px-4 py-3 text-sm leading-7 text-ink/62">
        生命分数：<span className="font-semibold text-ink">{fact.absorptionScore}/5</span>
        <span className="mx-2 text-ink/30">·</span>
        关系 {fact.relationReasons.length} 条，路径 {fact.pathIds.length} 条，时间锚点 {fact.timelineEventIds.length} 个。
      </div>
    </section>
  )
}

import Link from 'next/link'
import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { WorldDepthPrelude, WorldGatewayPanel } from '@/components/r2-world-entry'
import { R3ContentPathways, R3NodeConstellation } from '@/components/r3-content-life'
import { R5PathRecommendations } from '@/components/r5-ai-lighthouse'

const deeperEntrances = [
  {
    href: '/r4-creator',
    title: '创世台',
    description: '主人工作台：收集、安放、设权、关联与导出。',
  },
  {
    href: '/r6-service',
    title: '服务边界',
    description: 'Owner-only API、审计、导出与服务健康检查。',
  },
  {
    href: '/r7-evolution',
    title: '长期演化',
    description: '世界状态、生命周期、低光运行与周期回望。',
  },
  {
    href: '/r8-public',
    title: '公开运营',
    description: '公开发布、安全审查、反馈与持续运营证据。',
  },
]

function DeepEntranceCards() {
  return (
    <section className="rounded-[2rem] border border-white/55 bg-white/80 p-6 shadow-soft backdrop-blur md:p-8">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.35em] text-moss">DEEPER GATES</p>
        <h2 className="mt-3 text-2xl font-semibold text-ink md:text-3xl">入口保持清澈，深处继续展开。</h2>
        <p className="mt-3 text-sm leading-7 text-ink/65">
          首页只保留世界入口、真实节点、精选路径和灯塔导览；创世台、服务边界、长期演化与公开运营进入深层页面，避免把第一屏变成治理面板。
        </p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {deeperEntrances.map((entry) => (
          <Link
            key={entry.href}
            href={entry.href}
            className="rounded-[1.5rem] border border-white/60 bg-sand/55 p-5 transition hover:-translate-y-0.5 hover:bg-white"
          >
            <p className="text-lg font-semibold text-ink">{entry.title}</p>
            <p className="mt-2 text-sm leading-6 text-ink/60">{entry.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <ResponsivePageShell>
      <WorldDepthPrelude />
      <WorldGatewayPanel />
      <R3NodeConstellation />
      <R3ContentPathways />
      <R5PathRecommendations />
      <DeepEntranceCards />
    </ResponsivePageShell>
  )
}

import Link from 'next/link'
import { getAllAreas } from '@/lib/areas'
import { getPublicNodes } from '@/lib/nodes'
import { getAllPaths } from '@/lib/paths'
import { createPageMetadata } from '@/lib/metadata'
import { getLivingWorldStatus } from '@/lib/living-world-status'
import { RealityFirstBaselinePanel } from '@/components/status'

export const metadata = createPageMetadata({
  title: '世界状态',
  description: '古月浮屿在 localhost 与局域网中的真实运行、风险门和证据摘要。',
  path: '/status',
})

export default function StatusPage() {
  const publicNodes = getPublicNodes()
  const areas = getAllAreas().filter((area) => area.level === 1)
  const paths = getAllPaths()
  const status = getLivingWorldStatus()
  const statusCards = [
    {
      title: '当前产品状态',
      value: '生命世界开发中',
      code: status.productStatus,
      description: '电影感场景可用，但持续生命、背景独立主体和完整感官闭环尚未通过。',
    },
    {
      title: '执行指针',
      value: `${status.currentItem} · ${status.taskState}`,
      code: status.goalStatus,
      description: '只从执行账本的第一项未完成任务继续，不继承旧完成声明。',
    },
    {
      title: '首个风险门',
      value: status.firstOpenGate?.label ?? '风险门已完成',
      code: status.firstOpenGate?.status ?? 'passed',
      description: status.firstOpenGate ? '该风险门通过前，不向后复制未经验证的实现。' : '所有固定风险门均已有当前证据。',
    },
    {
      title: '最新证据',
      value: status.latestEvidence ? new Date(status.latestEvidence.recordedAt).toLocaleString('zh-CN', { hour12: false }) : '尚无当前证据',
      code: status.latestEvidence?.path.split('/').at(-1) ?? 'none',
      description: '这里显示可追溯证据文件时间，不把报告状态当成产品完成。',
    },
    {
      title: '灯塔 Provider',
      value: status.provider.status,
      code: `${status.provider.id} · ${status.provider.model}`,
      description: 'Provider 仅允许服务端读取公开投影；未接入前继续诚实使用低光导览。',
    },
  ]

  return (
    <main className="world-container space-y-10 py-16">
      <header className="border-b border-ink/15 pb-8">
        <p className="text-xs font-semibold text-moss">STATUS · {status.scope} 维护舱</p>
        <h1 className="mt-3 text-4xl font-semibold text-ink">世界状态</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/62">这里集中展示本地生命世界的当前事实、风险门和证据时间，不进入访客探索主线。</p>
        <nav className="mt-5 flex gap-4 text-sm font-semibold"><Link href="/">返回入口</Link><Link href="/atlas">查看星图</Link><Link href="/ask">询问灯塔</Link></nav>
      </header>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {statusCards.map((card) => (
          <article key={card.title} className="min-w-0 rounded-md border border-ink/12 bg-white/74 p-5 shadow-soft backdrop-blur">
            <p className="text-sm text-ink/50">{card.title}</p>
            <h2 className="mt-3 break-words text-xl font-semibold text-ink">{card.value}</h2>
            <p className="mt-2 break-all font-mono text-[11px] leading-5 text-moss">{card.code}</p>
            <p className="mt-3 text-sm leading-6 text-ink/62">{card.description}</p>
          </article>
        ))}
      </section>

      <RealityFirstBaselinePanel
        productStatus={status.productStatus}
        currentItem={status.currentItem}
        evidenceAt={status.latestEvidence?.recordedAt ?? null}
      />

      <section className="grid gap-4 lg:grid-cols-3">
        {[
          ['公开节点', publicNodes.length, '可被地图、档案馆、路径和灯塔公开投影读取。'],
          ['主区域', areas.length, '一级区域保持少而清晰，深层内容由节点和关系承载。'],
          ['公开路径', paths.length, '路径降低首次探索门槛，并保留中断与返回上下文。'],
        ].map(([label, value, description]) => (
          <article key={String(label)} className="min-w-0 border-t border-ink/15 py-5">
            <p className="text-xs font-semibold text-moss">{label}</p>
            <h2 className="mt-2 text-3xl font-semibold text-ink">{value}</h2>
            <p className="mt-2 text-sm leading-6 text-ink/62">{description}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

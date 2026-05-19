import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPaths, getPathById } from '@/lib/paths'
import { getNodeBySlug } from '@/lib/nodes'
import { NodeCard } from '@/components/node/NodeCard'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { PathProgress } from '@/components/paths/PathProgress'
import { createPageMetadata } from '@/lib/metadata'

export function generateStaticParams() {
  return getAllPaths().map((path) => ({ id: path.id }))
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const path = getPathById(params.id)
  if (!path) return createPageMetadata({ title: '路径不存在', path: '/paths' })
  return createPageMetadata({
    title: path.title,
    description: path.description,
    path: `/paths/${path.id}`,
  })
}

export default function PathDetailPage({ params }: { params: { id: string } }) {
  const path = getPathById(params.id)
  if (!path) notFound()

  const nodes = path.nodeSlugs
    .map((slug) => getNodeBySlug(slug))
    .filter(Boolean)

  return (
    <main className="world-container grid gap-10 py-16 xl:grid-cols-[minmax(0,1fr)_340px]">
      <section className="space-y-10">
        <Breadcrumbs items={[{ label: '古月浮屿', href: '/' }, { label: '精选路径', href: '/paths' }, { label: path.title }]} />

        <header className="max-w-3xl space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-moss">{path.audience}</p>
          <h1 className="text-5xl font-semibold">{path.title}</h1>
          <p className="text-lg leading-9 text-ink/70">{path.description}</p>
          <p className="text-sm text-ink/45">{nodes.length} 个节点 · 约 {path.estimatedMinutes ?? 8} 分钟</p>
        </header>

        <section className="space-y-5">
          {nodes.map((node, index) => node && (
            <div key={node.id} className="grid gap-4 md:grid-cols-[80px_minmax(0,1fr)]">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper">
                {index + 1}
              </div>
              <NodeCard node={node} />
            </div>
          ))}
        </section>

        <section className="rounded-world border border-ink/10 bg-white/45 p-6">
          <p className="leading-8 text-ink/70">
            这条路已经走到尽头。你可以回到地图，或继续打开档案馆寻找下一颗星。
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/atlas" className="rounded-full bg-ink px-5 py-3 text-paper">回到地图</Link>
            <Link href="/archive" className="rounded-full border border-ink/10 bg-white/60 px-5 py-3">打开档案馆</Link>
          </div>
        </section>
      </section>

      <aside className="xl:sticky xl:top-24 xl:self-start">
        <PathProgress nodes={nodes} />
      </aside>
    </main>
  )
}

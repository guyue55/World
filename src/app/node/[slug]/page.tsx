import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getNodeBySlug, getPublicNodes } from '@/lib/nodes'
import { getAreaById } from '@/lib/areas'
import { getBacklinks, getForwardLinks } from '@/lib/backlinks'
import { readContentFile } from '@/lib/content'
import { NodePassport } from '@/components/node/NodePassport'
import { NodeLifeStageBadge } from '@/components/node/NodeLifeStageBadge'
import { NodeCard } from '@/components/node/NodeCard'
import { NodeCover } from '@/components/node/NodeCover'
import { MarkdownContent } from '@/components/common/MarkdownContent'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { EmptyState } from '@/components/common/EmptyState'
import { createPageMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/common/JsonLd'
import { nodeArticleJsonLd } from '@/lib/jsonld'

export function generateStaticParams() {
  return getPublicNodes().map((node) => ({ slug: node.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const node = getNodeBySlug(params.slug)
  if (!node) return createPageMetadata({ title: '节点不存在', path: '/archive' })
  return createPageMetadata({
    title: node.title,
    description: node.summary,
    path: `/node/${node.slug}`,
  })
}

export default function NodePage({ params }: { params: { slug: string } }) {
  const node = getNodeBySlug(params.slug)
  if (!node || node.visibility !== 'public') notFound()

  const area = getAreaById(node.areaId)
  const backlinks = getBacklinks(node.id).slice(0, 3)
  const forwardLinks = getForwardLinks(node.id).slice(0, 3)
  const content = readContentFile(node.contentPath)

  return (
    <main className="world-container grid gap-10 py-16 xl:grid-cols-[minmax(0,1fr)_360px]">
      <article className="space-y-8">
        <JsonLd data={nodeArticleJsonLd(node)} />
        <Breadcrumbs
          items={[
            { label: '古月浮屿', href: '/atlas' },
            { label: area?.worldName ?? node.areaId, href: '/atlas' },
            { label: node.title },
          ]}
        />

        <NodeCover node={node} />

        <header className="space-y-4">
          <NodeLifeStageBadge stage={node.lifeStage} />
          <h1 className="text-5xl font-semibold leading-tight">{node.title}</h1>
          {node.worldTitle && <p className="text-2xl text-moss">{node.worldTitle}</p>}
          {node.summary && <p className="text-lg leading-9 text-ink/75">{node.summary}</p>}
        </header>

        <section className="rounded-world border border-ink/10 bg-white/45 p-8 shadow-soft">
          {content ? (
            <MarkdownContent content={content} />
          ) : (
            <EmptyState
              title="这颗星还没有完整正文"
              description="它已经被安放在世界中，拥有位置、权限、生命周期与关系。后续可以通过 contentPath 接入 Markdown / MDX 正文。"
              href="/archive"
              action="打开档案馆"
            />
          )}
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">从这里可以去哪里</h2>
            {forwardLinks.length ? forwardLinks.map((item) => <NodeCard key={item.id} node={item} />) : <p className="text-ink/60">暂无前向星线。</p>}
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">哪些节点提到它</h2>
            {backlinks.length ? backlinks.map((item) => <NodeCard key={item.id} node={item} />) : <p className="text-ink/60">暂无反向星线。</p>}
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link className="rounded-full border border-ink/10 bg-white/45 px-5 py-3" href="/atlas">返回地图</Link>
          <Link className="rounded-full border border-ink/10 bg-white/45 px-5 py-3" href="/archive">打开档案馆</Link>
        </div>
      </article>

      <aside>
        <NodePassport node={node} area={area} />
      </aside>
    </main>
  )
}

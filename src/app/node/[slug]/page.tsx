import { notFound } from 'next/navigation'
import { getNodeBySlug, getPublicNodes, getPublicNodesByArea } from '@/lib/nodes'
import { getAreaById } from '@/lib/areas'
import { readContentFile } from '@/lib/content'
import { estimateReadingMinutes, getNodeExplorationGroups } from '@/lib/node-reading'
import { buildNodeOpeningSurface } from '@/lib/public-world-surfaces'
import { extractReadingHeadings, getReadingComfortSummary } from '@/lib/reading-comfort'
import { NodePassport } from '@/components/node/NodePassport'
import { NodeCover } from '@/components/node/NodeCover'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { createPageMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/common/JsonLd'
import { nodeArticleJsonLd } from '@/lib/jsonld'
import { NodeReadingHeader } from '@/components/node/NodeReadingHeader'
import { NodeReadingBody } from '@/components/node/NodeReadingBody'
import { NodeRelationRail } from '@/components/node/NodeRelationRail'
import { NodeReadingActions } from '@/components/node/NodeReadingActions'
import { NodeOpeningRitual } from '@/components/node/NodeOpeningRitual'
import { ReadingComfortBar } from '@/components/reading/ReadingComfortBar'
import { ReadingToc } from '@/components/reading/ReadingToc'

export const dynamicParams = false

type NodePageParams = {
  slug: string
}

export function generateStaticParams() {
  return getPublicNodes().map((node) => ({ slug: node.slug }))
}

export async function generateMetadata({ params }: { params: Promise<NodePageParams> }) {
  const { slug } = await params
  const node = getNodeBySlug(slug)
  if (!node) return createPageMetadata({ title: '节点不存在', path: '/archive' })

  return createPageMetadata({
    title: node.worldTitle ? `${node.worldTitle}｜${node.title}` : node.title,
    description: node.summary,
    path: `/node/${node.slug}`,
  })
}

export default async function NodePage({ params }: { params: Promise<NodePageParams> }) {
  const { slug } = await params
  const node = getNodeBySlug(slug)
  if (!node || node.visibility !== 'public') notFound()

  const area = getAreaById(node.areaId)
  const content = readContentFile(node.contentPath)
  const readingMinutes = estimateReadingMinutes(content)
  const explorationGroups = getNodeExplorationGroups(node)
  const headings = extractReadingHeadings(content)
  const comfort = getReadingComfortSummary(content, readingMinutes)
  const nodeOpeningSurface = buildNodeOpeningSurface(node, area, readingMinutes)

  return (
    <main className="world-container grid gap-10 py-16 xl:grid-cols-[minmax(0,1fr)_340px]">
      <article className="space-y-8">
        <JsonLd data={nodeArticleJsonLd(node)} />
        <Breadcrumbs
          items={[
            { label: '古月浮屿', href: '/' },
            { label: '世界地图', href: '/atlas' },
            { label: area?.worldName ?? node.areaId, href: `/atlas#${node.areaId}` },
            { label: node.worldTitle ?? node.title },
          ]}
        />

        <NodeOpeningRitual surface={nodeOpeningSurface} />
        <NodeCover node={node} />
        <NodeReadingHeader node={node} areaName={area?.worldName} readingMinutes={readingMinutes} />
        <ReadingComfortBar
          readingMinutes={comfort.readingMinutes}
          headingCount={comfort.headingCount}
          readingWidth={comfort.readingWidth}
        />
        <div className="xl:hidden">
          <NodePassport node={node} area={area} />
        </div>
        <div className="xl:hidden">
          <ReadingToc headings={headings} />
        </div>
        <NodeReadingBody content={content} />
        <NodeRelationRail groups={explorationGroups} />
        <NodeReadingActions />
      </article>

      <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
        <div className="hidden xl:block">
          <NodePassport node={node} area={area} />
        </div>
        <div className="hidden xl:block">
          <ReadingToc headings={headings} />
        </div>
        <section className="rounded-[1.75rem] border border-white/65 bg-white/70 p-5 text-sm leading-7 text-ink/62 shadow-soft backdrop-blur">
          <p className="font-semibold text-ink">下一步</p>
          <p className="mt-2 mb-4">继续沿这个区域查看 {getPublicNodesByArea(node.areaId).length} 个公开节点，或回到地图重新选择路径。</p>
          <div className="flex flex-col gap-2">
            <a href="/atlas" className="block w-full rounded-full bg-ink px-4 py-2 text-center font-semibold text-paper transition hover:bg-night">
              返回世界地图
            </a>
            <a href="/archive" className="block w-full rounded-full border border-ink/10 bg-white/75 px-4 py-2 text-center font-semibold text-ink transition hover:bg-white">
              去档案馆检索
            </a>
          </div>
        </section>
      </aside>
    </main>
  )
}

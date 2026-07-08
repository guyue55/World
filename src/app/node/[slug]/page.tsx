import { notFound, redirect } from 'next/navigation'
import { getNodeBySlug, getPublicNodes, getPublicNodesByArea } from '@/lib/nodes'
import { getAreaById } from '@/lib/areas'
import { readContentFile } from '@/lib/content'
import { isPublicVisible } from '@/lib/visibility'
import { estimateReadingMinutes, getNodeExplorationGroups } from '@/lib/node-reading'
import { buildNodeNextStepSurface, buildNodeOpeningSurface } from '@/lib/public-world-surfaces'
import { extractReadingHeadings, getReadingComfortSummary } from '@/lib/reading-comfort'
import { createPageMetadata } from '@/lib/metadata'
import { nodeArticleJsonLd } from '@/lib/jsonld'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { JsonLd } from '@/components/common/JsonLd'
import {
  NodeCover,
  NodeNextStepPanel,
  NodeOpeningRitual,
  NodePassport,
  NodeReadingActions,
  NodeReadingBody,
  NodeReadingHeader,
  NodeRelationRail,
} from '@/components/node'
import { ReadingComfortBar, ReadingToc } from '@/components/reading'

export const dynamicParams = true

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
  if (!isPublicVisible(node.visibility)) return createPageMetadata({ title: '无权限访问', path: '/forbidden' })

  return createPageMetadata({
    title: node.worldTitle ? `${node.worldTitle}｜${node.title}` : node.title,
    description: node.summary,
    path: `/node/${node.slug}`,
  })
}

export default async function NodePage({ params }: { params: Promise<NodePageParams> }) {
  const { slug } = await params
  const node = getNodeBySlug(slug)
  if (!node) notFound()
  if (!isPublicVisible(node.visibility)) redirect('/forbidden')

  const area = getAreaById(node.areaId)
  const content = readContentFile(node.contentPath)
  const readingMinutes = estimateReadingMinutes(content)
  const explorationGroups = getNodeExplorationGroups(node)
  const headings = extractReadingHeadings(content)
  const comfort = getReadingComfortSummary(content, readingMinutes)
  const sameAreaNodes = getPublicNodesByArea(node.areaId)
  const nodeOpeningSurface = buildNodeOpeningSurface(node, area, readingMinutes)
  const nodeNextStepSurface = buildNodeNextStepSurface(node, area, sameAreaNodes.length)

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
        <NodeNextStepPanel surface={nodeNextStepSurface} />
      </aside>
    </main>
  )
}

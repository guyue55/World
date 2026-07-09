import { notFound, redirect } from 'next/navigation'
import { getNodeBySlug, getPublicNodes, getPublicNodesByArea } from '@/lib/nodes'
import { getAreaById } from '@/lib/areas'
import { readContentFile } from '@/lib/content'
import { isPublicVisible } from '@/lib/visibility'
import { estimateReadingMinutes, getNodeExplorationGroups } from '@/lib/node-reading'
import { buildContentLifeNodeFact } from '@/lib/content-life'
import { getAllPaths } from '@/lib/paths'
import { getAllRelations } from '@/lib/relations'
import { getAllWorldEvents } from '@/lib/world-events'
import { buildNodeNextStepSurface, buildNodeOpeningSurface } from '@/lib/public-world-surfaces'
import { extractReadingHeadings, getReadingComfortSummary } from '@/lib/reading-comfort'
import { createPageMetadata } from '@/lib/metadata'
import { nodeArticleJsonLd } from '@/lib/jsonld'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { JsonLd } from '@/components/common/JsonLd'
import { SceneProductionFrame } from '@/components/world/SceneProductionFrame'
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
  const contentLifeFact = buildContentLifeNodeFact({
    node,
    paths: getAllPaths(),
    relations: getAllRelations(),
    events: getAllWorldEvents(),
  })
  const nodePlaceLifeSignal = {
    status: contentLifeFact.status,
    relationCount: contentLifeFact.relationReasons.length,
    pathCount: contentLifeFact.pathIds.length,
    timelineEventCount: contentLifeFact.timelineEventIds.length,
    recommendedPathCount: contentLifeFact.recommendedPathIds.length,
  }

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

        <SceneProductionFrame
          sceneId="node"
          eyebrow="NODE · 节点展开室"
          title={node.worldTitle ?? node.title}
          description={`你抵达的是 ${area?.worldName ?? node.areaId} 中的一处公开地点。先读节点护照，再看正文和关系出口。`}
          motionLabel="节点只保留来源残影、关系提示和下一步浮层；正文始终先可读。"
          fallback="reduced-motion 或无 JS 时退回标准文章详情、节点护照和静态关系清单。"
          evidence="节点页纳入 Scene QA 的 node 路由，验证身份带、空气层、转场壳、正文和下一步出口。"
          actions={[
            { href: `/atlas#${node.areaId}`, label: '回到所在星域', description: area?.worldName ?? node.areaId, tone: 'primary' },
            { href: '/paths', label: '选择一条路径', description: '把这个节点放回旅程中' },
            { href: '/timeline', label: '回看时间河', description: '从事件线索继续探索' },
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
          <NodePassport node={node} area={area} lifeSignal={nodePlaceLifeSignal} />
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
          <NodePassport node={node} area={area} lifeSignal={nodePlaceLifeSignal} />
        </div>
        <div className="hidden xl:block">
          <ReadingToc headings={headings} />
        </div>
        <NodeNextStepPanel surface={nodeNextStepSurface} />
      </aside>
    </main>
  )
}

import { notFound, redirect } from 'next/navigation'
import { JsonLd } from '@/components/common/JsonLd'
import { NodeNextStepPanel } from '@/components/node/NodeNextStepPanel'
import { NodePlaceRoom } from '@/components/node/NodePlaceRoom'
import roomStyles from '@/components/node/NodePlaceRoom.module.css'
import { NodeReadingBody } from '@/components/node/NodeReadingBody'
import { NodeReadingHeader } from '@/components/node/NodeReadingHeader'
import { NodeRelationRail } from '@/components/node/NodeRelationRail'
import { ReadingComfortBar } from '@/components/reading/ReadingComfortBar'
import { ReadingToc } from '@/components/reading/ReadingToc'
import { getAreaById } from '@/lib/areas'
import { readContentFile } from '@/lib/content'
import { nodeArticleJsonLd } from '@/lib/jsonld'
import { createPageMetadata } from '@/lib/metadata'
import { estimateReadingMinutes, getNodeExplorationGroups } from '@/lib/node-reading'
import { getNodeBySlug, getPublicNodes } from '@/lib/nodes'
import { getAllPaths } from '@/lib/paths'
import { getPublicWorldObjectIndex } from '@/lib/public-world-objects'
import { buildNodeNextStepSurface } from '@/lib/public-world-surfaces'
import { extractReadingHeadings, getReadingComfortSummary } from '@/lib/reading-comfort'
import { buildNodePlaceModel, type NodePathContext } from '@/lib/scenes/build-node-model'
import { isPublicVisible } from '@/lib/visibility'

export const dynamicParams = true
type NodePageParams = { slug: string }
type NodeSearchParams = { fromPath?: string | string[]; step?: string | string[] }

export function generateStaticParams() { return getPublicNodes().map((node) => ({ slug: node.slug })) }

export async function generateMetadata({ params }: { params: Promise<NodePageParams> }) {
  const { slug } = await params
  const node = getNodeBySlug(slug)
  if (!node) return createPageMetadata({ title: '节点不存在', path: '/archive' })
  if (!isPublicVisible(node.visibility)) return createPageMetadata({ title: '无权限访问', path: '/forbidden' })
  return createPageMetadata({ title: node.worldTitle ? `${node.worldTitle}｜${node.title}` : node.title, description: node.summary, path: `/node/${node.slug}` })
}

function scalar(value: string | string[] | undefined) { return Array.isArray(value) ? value[0] : value }

export default async function NodePage({ params, searchParams }: { params: Promise<NodePageParams>; searchParams: Promise<NodeSearchParams> }) {
  const [{ slug }, query] = await Promise.all([params, searchParams])
  const node = getNodeBySlug(slug)
  if (!node) notFound()
  if (!isPublicVisible(node.visibility)) redirect('/forbidden')

  const index = getPublicWorldObjectIndex()
  const area = getAreaById(node.areaId)
  const content = readContentFile(node.contentPath)
  const readingMinutes = estimateReadingMinutes(content)
  const explorationGroups = getNodeExplorationGroups(node)
  const headings = extractReadingHeadings(content)
  const comfort = getReadingComfortSummary(content, readingMinutes)
  const pathId = scalar(query.fromPath)
  const stepIndex = Number(scalar(query.step))
  const path = pathId ? getAllPaths().find((item) => item.id === pathId) : null
  const validStep = path && Number.isInteger(stepIndex) && stepIndex >= 0 && path.nodeSlugs[stepIndex] === node.slug
  const nextSlug = validStep ? path.nodeSlugs[stepIndex + 1] : null
  const nextNode = nextSlug ? index.nodeBySlug.get(nextSlug) : null
  const pathContext: NodePathContext | null = validStep && path ? { pathId: path.id, pathTitle: path.title, stepIndex, stepCount: path.nodeSlugs.length, nextNode: nextNode ? { slug: nextNode.slug, title: nextNode.worldTitle ?? nextNode.title } : null } : null
  const model = buildNodePlaceModel({ index, node, readingMinutes, groups: explorationGroups, pathContext })
  const nextStepSurface = buildNodeNextStepSurface(node, area, index.nodes.filter((item) => item.areaId === node.areaId).length)

  return <main>
    <JsonLd data={nodeArticleJsonLd(node)} />
    <NodePlaceRoom model={model} />
    <section id="reading" className={roomStyles.readingWorld} aria-label={`${model.title}正文`}>
      <div className={roomStyles.readingLayout}>
        <article className={roomStyles.readingArticle}>
          <NodeReadingHeader node={node} areaName={area?.worldName} readingMinutes={readingMinutes} />
          <ReadingComfortBar readingMinutes={comfort.readingMinutes} headingCount={comfort.headingCount} readingWidth={comfort.readingWidth} />
          <NodeReadingBody content={content} />
          <NodeRelationRail groups={explorationGroups} sourceSlug={node.slug} />
        </article>
        <aside className={roomStyles.readingAside}>
          <ReadingToc headings={headings} />
          <NodeNextStepPanel surface={nextStepSurface} />
        </aside>
      </div>
    </section>
  </main>
}

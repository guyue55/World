import { notFound } from 'next/navigation'
import { getNodeBySlug, getPublicNodes, getPublicNodesByArea } from '@/lib/nodes'
import { getAreaById } from '@/lib/areas'
import { readContentFile } from '@/lib/content'
import {
  estimateReadingMinutes,
  getNodeExplorationGroups,
} from '@/lib/node-reading'
import {
  extractReadingHeadings,
  getReadingComfortSummary,
} from '@/lib/reading-comfort'
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
import { ReadingComfortBar } from '@/components/reading/ReadingComfortBar'
import { ReadingToc } from '@/components/reading/ReadingToc'
import { ImmersiveNodeReader } from '@/components/r8-deep-dynamic-world'
import { CompleteUniverseSection, TodayWorldPanel } from '@/components/r8-complete-universe'
import { SensoryUniverseSection } from '@/components/r8-sensory-universe'
import { InteractiveUniverseSection } from '@/components/r8-interactive-universe'
import { SceneUniverseSection } from '@/components/r8-scene-universe'
import { CivilizationUniverseSection, NodeLifeConstellation } from '@/components/r8-civilization-universe'

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
    title: node.title,
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

  return (
    <main className="world-container grid gap-10 py-16 xl:grid-cols-[minmax(0,1fr)_340px]">
      <article className="space-y-8">
        <SensoryUniverseSection />
      <SceneUniverseSection />
      <CivilizationUniverseSection />
      <NodeLifeConstellation />
      <InteractiveUniverseSection />
      <CompleteUniverseSection />
        <TodayWorldPanel />
        <JsonLd data={nodeArticleJsonLd(node)} />
        <Breadcrumbs
          items={[
            { label: '古月浮屿', href: '/atlas' },
            { label: area?.worldName ?? node.areaId, href: '/atlas' },
            { label: node.title },
          ]}
        />

        <NodeCover node={node} />
        <NodeReadingHeader node={node} areaName={area?.worldName} readingMinutes={readingMinutes} />
        <ReadingComfortBar
          readingMinutes={comfort.readingMinutes}
          headingCount={comfort.headingCount}
          readingWidth={comfort.readingWidth}
        />
        <div className="xl:hidden">
          <ReadingToc headings={headings} />
        </div>
        <NodeReadingBody content={content} />
        <NodeRelationRail groups={explorationGroups} />
        <NodeReadingActions />
      </article>

      <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
        <div className="hidden xl:block">
          <ReadingToc headings={headings} />
        </div>
        <ImmersiveNodeReader node={node} area={area} relatedNodes={getPublicNodesByArea(node.areaId)} />
        <NodePassport node={node} area={area} />
      </aside>
    </main>
  )
}

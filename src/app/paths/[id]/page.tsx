import { notFound } from 'next/navigation'
import { getAllPaths, getPathById } from '@/lib/paths'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { PathProgress } from '@/components/paths/PathProgress'
import { createPageMetadata } from '@/lib/metadata'
import { getNextPaths, getPathNodes } from '@/lib/path-guidance'
import { getAllAreas } from '@/lib/areas'
import { buildPathJourneySurface } from '@/lib/public-world-surfaces'
import { PathDetailHero } from '@/components/paths/PathDetailHero'
import { PathJourneyBoard } from '@/components/paths/PathJourneyBoard'
import { PathNodeSequence } from '@/components/paths/PathNodeSequence'
import { PathNextSteps } from '@/components/paths/PathNextSteps'

type PathPageParams = {
  id: string
}

export function generateStaticParams() {
  return getAllPaths().map((path) => ({ id: path.id }))
}

export async function generateMetadata({ params }: { params: Promise<PathPageParams> }) {
  const { id } = await params
  const path = getPathById(id)
  if (!path) return createPageMetadata({ title: '路径不存在', path: '/paths' })

  return createPageMetadata({
    title: path.title,
    description: path.description,
    path: `/paths/${path.id}`,
  })
}

export default async function PathDetailPage({ params }: { params: Promise<PathPageParams> }) {
  const { id } = await params
  const path = getPathById(id)
  if (!path) notFound()

  const nodes = getPathNodes(path)
  const nextPaths = getNextPaths(path)
  const journeySurface = buildPathJourneySurface(path, nodes, nextPaths, getAllAreas())

  return (
    <main className="world-container grid gap-10 py-16 xl:grid-cols-[minmax(0,1fr)_340px]">
      <section className="space-y-10">
        <Breadcrumbs items={[{ label: '古月浮屿', href: '/' }, { label: '精选路径', href: '/paths' }, { label: path.title }]} />
        <PathDetailHero path={path} nodeCount={nodes.length} />
        <PathJourneyBoard surface={journeySurface} />
        <PathNodeSequence nodes={nodes} />
        <PathNextSteps nextPaths={nextPaths} />
      </section>

      <aside className="xl:sticky xl:top-24 xl:self-start">
        <PathProgress nodes={nodes} />
      </aside>
    </main>
  )
}

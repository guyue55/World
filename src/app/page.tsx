import { FeaturedNodeGrid } from '@/components/home/FeaturedNodeGrid'
import { HomeHero } from '@/components/home/HomeHero'
import { HomePathRail } from '@/components/home/HomePathRail'
import { HomeStatusSummary } from '@/components/home/HomeStatusSummary'
import { HomeWorldRhythm } from '@/components/home/HomeWorldRhythm'
import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { getAllAreas } from '@/lib/areas'
import { getFeaturedNodes, getPublicNodes } from '@/lib/nodes'
import { getAllPaths } from '@/lib/paths'

export default function HomePage() {
  const areas = getAllAreas()
  const featuredNodes = getFeaturedNodes().slice(0, 6)
  const paths = getAllPaths().slice(0, 3)
  const publicNodes = getPublicNodes()

  return (
    <ResponsivePageShell className="pt-6 md:pt-10">
      <HomeHero />
      <FeaturedNodeGrid nodes={featuredNodes} />
      <HomePathRail paths={paths} />
      <HomeWorldRhythm />
      <HomeStatusSummary
        publicNodeCount={publicNodes.length}
        areaCount={areas.length}
        pathCount={paths.length}
      />
    </ResponsivePageShell>
  )
}

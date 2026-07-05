import { ProductHome } from '@/components/product/ProductHome'
import { getAllAreas } from '@/lib/areas'
import { getFeaturedNodes, getPublicNodes } from '@/lib/nodes'
import { getAllPaths } from '@/lib/paths'
import { getRecentWorldEvents } from '@/lib/world-events'
import { buildHomeDynamicWorldSurface } from '@/lib/public-world-surfaces'

export default function HomePage() {
  const areas = getAllAreas()
  const featuredNodes = getFeaturedNodes()
  const publicNodes = getPublicNodes()
  const paths = getAllPaths()
  const events = getRecentWorldEvents(4)
  const dynamicWorld = buildHomeDynamicWorldSurface({ areas, nodes: publicNodes, paths, events })

  return (
    <ProductHome
      areas={areas}
      featuredNodes={featuredNodes}
      publicNodes={publicNodes}
      paths={paths}
      events={events}
      dynamicWorld={dynamicWorld}
    />
  )
}

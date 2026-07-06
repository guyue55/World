import { ProductHome } from '@/components/product/ProductHome'
import { getPublicWorldObjectIndex } from '@/lib/public-world-objects'
import { buildHomeDynamicWorldSurface } from '@/lib/public-world-surfaces'

export default function HomePage() {
  const publicWorld = getPublicWorldObjectIndex()
  const areas = publicWorld.areas
  const publicNodes = publicWorld.nodes
  const featuredNodes = publicNodes.filter((node) => node.featured?.home || node.featured?.representative)
  const paths = publicWorld.paths
  const events = publicWorld.events.slice(0, 4)
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

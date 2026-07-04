import { ProductHome } from '@/components/product/ProductHome'
import { getAllAreas } from '@/lib/areas'
import { getFeaturedNodes, getPublicNodes } from '@/lib/nodes'
import { getAllPaths } from '@/lib/paths'
import { getRecentWorldEvents } from '@/lib/world-events'

export default function HomePage() {
  return (
    <ProductHome
      areas={getAllAreas()}
      featuredNodes={getFeaturedNodes()}
      publicNodes={getPublicNodes()}
      paths={getAllPaths()}
      events={getRecentWorldEvents(4)}
    />
  )
}

import { ProductHome } from '@/components/product/ProductHome'
import { getPublicWorldObjectIndex } from '@/lib/public-world-objects'
import { buildGatewayModel } from '@/lib/scenes/build-gateway-model'

export default function HomePage() {
  const publicWorld = getPublicWorldObjectIndex()
  return <ProductHome model={buildGatewayModel(publicWorld)} />
}

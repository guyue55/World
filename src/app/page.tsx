import { ProductHome } from '@/components/product/ProductHome'
import { StaticGatewayNoScript } from '@/components/product/StaticGatewayNoScript'
import { getPublicWorldObjectIndex } from '@/lib/public-world-objects'
import { buildGatewayModel } from '@/lib/scenes/build-gateway-model'

export default function HomePage() {
  const publicWorld = getPublicWorldObjectIndex()
  const model = buildGatewayModel(publicWorld)

  return (
    <>
      <noscript><StaticGatewayNoScript model={model} /></noscript>
      <ProductHome model={model} />
    </>
  )
}

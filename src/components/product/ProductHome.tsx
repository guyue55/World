import { WorldGatewayStage } from './WorldGatewayStage'
import type { GatewayViewModel } from '@/lib/scenes/build-gateway-model'

export function ProductHome({ model }: { model: GatewayViewModel }) {
  return (
    <main>
      <WorldGatewayStage model={model} />
    </main>
  )
}

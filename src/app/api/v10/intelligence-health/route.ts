import { v10FinalManifest, v10Roadmap, v10QualityResilience } from '@/features/v10-intelligent-world'

export function GET() {
  return Response.json({
    version: 'V10',
    name: '长期智能世界版',
    productionLive: v10Roadmap.productionLive,
    releaseReady: v10Roadmap.releaseReady,
    cleanProductionReady: v10QualityResilience.cleanProductionReady,
    tenRoundClosure: v10FinalManifest.tenRoundClosure,
  })
}

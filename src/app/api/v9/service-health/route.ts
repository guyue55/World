import { v9Roadmap, v9ServiceEvidenceLedger } from '@/features/v9-service-platform'

export function GET() {
  return Response.json({
    version: 'V9',
    name: '服务化平台版',
    serviceLive: v9Roadmap.serviceLive,
    productionLive: v9Roadmap.productionLive,
    releaseReady: v9Roadmap.releaseReady,
    checks: v9ServiceEvidenceLedger.checks,
  })
}

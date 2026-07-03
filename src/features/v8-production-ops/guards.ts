import {
  v8DeploymentPipeline,
  v8DomainSeoPerformance,
  v8ProductionEvidenceLedger,
  v8Roadmap,
  v8SignoffRollback,
} from './data'

export function assertV8ProductionBoundary() {
  const errors: string[] = []

  if (v8Roadmap.productionLive !== false) errors.push('V8 productionLive must stay false until real deployment evidence exists')
  if (v8Roadmap.releaseReady !== false) errors.push('V8 releaseReady must stay false until signoff and external evidence exist')
  if (v8DeploymentPipeline.productionLive !== false) errors.push('Deployment pipeline must not claim productionLive')
  if (v8ProductionEvidenceLedger.productionLive !== false) errors.push('Production evidence ledger must not claim productionLive')
  if (v8ProductionEvidenceLedger.releaseReady !== false) errors.push('Production evidence ledger must not claim releaseReady')
  if (v8SignoffRollback.manualSignoff !== false) errors.push('Manual signoff must remain false until human approval')
  if (v8SignoffRollback.rollbackDrillPassed !== false) errors.push('Rollback drill must remain false until real drill')
  if (v8DomainSeoPerformance.domainReady !== false) errors.push('Domain ready must remain false until external DNS/HTTPS evidence')
  if (v8DomainSeoPerformance.seoReady !== false) errors.push('SEO ready must remain false until external submission evidence')

  return errors
}

export function getV8ProductionBlockers() {
  return [
    'full production build exit 0 in target environment',
    'preview URL smoke test',
    'production URL external verification',
    'manual release signoff',
    'rollback drill evidence',
    'production observability baseline',
  ]
}

import fs from 'node:fs'
import { getPublicContentSeeds, getRedactedContentSeeds } from '../src/features/content-ingestion'
import { visualAssets } from '../src/features/asset-library'
import { getHighRiskAdapters, getProductionReadyAdapters } from '../src/features/service-adapters'
import { getPendingProductionGates, isProductionLiveAllowed } from '../src/features/production-readiness'
import { observabilitySignals } from '../src/features/observability'

const required = [
  'docs/10-development-history/round-03/README.md',
  'docs/10-development-history/round-03/final-closure.md',
  'data/round-03/round-03-plan.json',
  'data/round-03/final-report.json',
  'src/app/content-studio/page.tsx',
  'src/app/asset-library/page.tsx',
  'src/app/service-adapters/page.tsx',
  'src/app/production-readiness/page.tsx',
  'src/app/observability/page.tsx',
  'src/features/content-ingestion/index.ts',
  'src/features/asset-library/index.ts',
  'src/features/service-adapters/index.ts',
  'src/features/production-readiness/index.ts',
  'src/features/observability/index.ts',
]

const errors: string[] = []
for (const item of required) {
  if (!fs.existsSync(item)) errors.push(`missing ${item}`)
}

if (getPublicContentSeeds().length < 3) errors.push('round3 must include at least 3 public content seeds')
if (getRedactedContentSeeds().length < 1) errors.push('round3 must include at least 1 redacted content seed')
if (visualAssets.length < 3) errors.push('round3 must include at least 3 visual assets')
if (getHighRiskAdapters().length < 1) errors.push('round3 must include at least 1 high risk adapter')
if (getProductionReadyAdapters().length !== 0) errors.push('mock adapters must not be production ready')
if (getPendingProductionGates().length < 1) errors.push('production gates must keep real pending items')
if (isProductionLiveAllowed()) errors.push('production live must not be allowed yet')
if (observabilitySignals.length < 4) errors.push('observability must include at least 4 signals')

const finalReport = JSON.parse(fs.readFileSync('data/round-03/final-report.json', 'utf8'))
if (finalReport.status !== 'complete') errors.push('round3 final report must be complete')
if (finalReport.productionLive !== false) errors.push('round3 must not claim productionLive')

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('Round 03 checks passed.')

import { checkBoundary, checkRequiredFiles, checkStage, failIfErrors, readJson } from './check-v8-production-common'

const roadmap = readJson('data/v8-production-ops/roadmap.json')
const extensions = readJson('data/v8-production-ops/extension-registry.json')
const deployment = readJson('data/v8-production-ops/deployment-pipeline.json')
const observability = readJson('data/v8-production-ops/observability-matrix.json')
const signoff = readJson('data/v8-production-ops/signoff-rollback.json')
const evidence = readJson('data/v8-production-ops/production-evidence-ledger.json')

const errors = [
  ...checkStage(1, [1, 2, 3, 4]),
  ...checkStage(2, [5, 6, 7, 8]),
  ...checkStage(3, [9, 10, 11, 12]),
  ...checkStage(4, [13, 14, 15, 16]),
  ...checkRequiredFiles([
    'src/features/v8-production-ops/data.ts',
    'src/features/v8-production-ops/guards.ts',
    'src/components/v8-production/V8ProductionHero.tsx',
    'src/components/v8-production/V8ProductionDashboard.tsx',
    'src/components/v8-production/V8OperationsMatrix.tsx',
    'src/components/v8-production/V8HandoffPanel.tsx',
    'src/app/v8-production/page.tsx',
    'docs/10-development-history/v8-production-ops/v8-round-08-all-tasks-and-extension-plan.md',
    'docs/10-development-history/v8-production-ops/v8-round-08-execution-report.md',
    'docs/10-development-history/v8-production-ops/quality-gates.md',
  ]),
  ...checkBoundary(),
]

if (roadmap.stages.length !== 4) errors.push('V8 roadmap must have 4 stages')
if (roadmap.batches.length !== 16) errors.push('V8 roadmap must have 16 batches')
if (extensions.items.length < 16) errors.push('V8 extension registry too small')
if (deployment.steps.length < 6) errors.push('V8 deployment pipeline too small')
if (observability.signals.length < 5) errors.push('V8 observability signals too few')
if (signoff.manualSignoff !== false) errors.push('V8 manual signoff must remain false')
if (evidence.productionLive !== false) errors.push('V8 production evidence must not claim productionLive')

failIfErrors(errors)
console.log('V8 production aggregate check passed.')

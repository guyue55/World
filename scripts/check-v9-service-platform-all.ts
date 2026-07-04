import { checkBoundary, checkRequiredFiles, checkStage, failIfErrors, readJson } from './check-v9-service-platform-common'

const roadmap = readJson('data/v9-service-platform/roadmap.json')
const extensions = readJson('data/v9-service-platform/extension-registry.json')
const identity = readJson('data/v9-service-platform/identity-rbac.json')
const blueprint = readJson('data/v9-service-platform/service-blueprint.json')
const api = readJson('data/v9-service-platform/api-contracts.json')
const storage = readJson('data/v9-service-platform/storage-migration.json')
const audit = readJson('data/v9-service-platform/audit-governance.json')
const handoff = readJson('data/v9-service-platform/v10-handoff.json')

const errors = [
  ...checkStage(1, [1, 2, 3, 4]),
  ...checkStage(2, [5, 6, 7, 8]),
  ...checkStage(3, [9, 10, 11, 12]),
  ...checkStage(4, [13, 14, 15, 16]),
  ...checkRequiredFiles([
    'src/features/v9-service-platform/data.ts',
    'src/features/v9-service-platform/guards.ts',
    'src/components/v9-platform/V9PlatformHero.tsx',
    'src/components/v9-platform/V9PlatformDashboard.tsx',
    'src/components/v9-platform/V9ServiceMatrix.tsx',
    'src/components/v9-platform/V9HandoffPanel.tsx',
    'src/app/v9-platform/page.tsx',
    'src/app/api/v9/service-health/route.ts',
    'docs/10-development-history/v9-service-platform/v9-round-09-all-tasks-and-extension-plan.md',
    'docs/10-development-history/v9-service-platform/v9-round-09-execution-report.md',
    'docs/10-development-history/v9-service-platform/quality-gates.md',
  ]),
  ...checkBoundary(),
]

if (roadmap.stages.length !== 4) errors.push('V9 roadmap must have 4 stages')
if (roadmap.batches.length !== 16) errors.push('V9 roadmap must have 16 batches')
if (extensions.items.length < 16) errors.push('V9 extension registry too small')
if (identity.roles.length < 6) errors.push('V9 identity roles too few')
if (blueprint.layers.length < 6) errors.push('V9 service layers too few')
if (api.contracts.length < 5) errors.push('V9 API contracts too few')
if (storage.ports.length < 4) errors.push('V9 storage ports too few')
if (audit.auditPolicy.appendOnly !== true) errors.push('V9 audit must be append-only')
if (handoff.ready !== true) errors.push('V9 handoff must be ready')

failIfErrors(errors)
console.log('V9 service platform aggregate check passed.')

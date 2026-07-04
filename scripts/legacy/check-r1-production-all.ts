import { checkBoundary, checkRequiredFiles, checkStage, failIfErrors, readJson } from './check-r1-production-common'

const roadmap = readJson('data/r1-production-stabilization/roadmap.json')
const extensions = readJson('data/r1-production-stabilization/extension-registry.json')
const gates = readJson('data/r1-production-stabilization/quality-gates.json')
const deploy = readJson('data/r1-production-stabilization/deployment-runbook.json')
const rc = readJson('data/r1-production-stabilization/release-candidate-manifest.json')

const errors = [
  ...checkStage(1, [1, 2, 3, 4]),
  ...checkStage(2, [5, 6, 7, 8]),
  ...checkStage(3, [9, 10, 11, 12]),
  ...checkStage(4, [13, 14, 15, 16]),
  ...checkRequiredFiles([
    'src/features/r1-production-stabilization/data.ts',
    'src/features/r1-production-stabilization/guards.ts',
    'src/components/r1-production/R1ProductionHero.tsx',
    'src/components/r1-production/R1ProductionDashboard.tsx',
    'src/components/r1-production/R1StageBoard.tsx',
    'src/components/r1-production/R1ReleaseEvidencePanel.tsx',
    'src/app/r1-production/page.tsx',
    'docs/10-development-history/r1-production-stabilization/r1-all-tasks-and-extension-plan.md',
    'docs/10-development-history/r1-production-stabilization/r1-execution-report.md',
    'docs/10-development-history/r1-production-stabilization/quality-gates.md',
  ]),
  ...checkBoundary(),
]

if (roadmap.stages.length !== 4) errors.push('R1 roadmap must have 4 stages')
if (roadmap.batches.length !== 16) errors.push('R1 roadmap must have 16 batches')
if (extensions.items.length < 10) errors.push('R1 extension registry too small')
if (gates.localCommands.length < 8) errors.push('R1 local command matrix too small')
if (deploy.previewSmokeRoutes.length < 8) errors.push('R1 preview smoke route matrix too small')
if (deploy.manualSignoffRequired !== true) errors.push('R1 manual signoff must be required')
if (rc.status !== 'local-engineering-candidate') errors.push('R1 RC must be local-engineering-candidate')

failIfErrors(errors)
console.log('R1 production stabilization aggregate check passed.')

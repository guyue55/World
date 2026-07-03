import { checkBoundary, checkRequiredFiles, checkStage, failIfErrors, readJson } from './check-v10-intelligent-world-common'

const roadmap = readJson('data/v10-intelligent-world/roadmap.json')
const extensions = readJson('data/v10-intelligent-world/extension-registry.json')
const kernel = readJson('data/v10-intelligent-world/intelligence-kernel.json')
const lifecycle = readJson('data/v10-intelligent-world/memory-lifecycle.json')
const evolution = readJson('data/v10-intelligent-world/evolution-rules.json')
const roles = readJson('data/v10-intelligent-world/ai-agent-roles.json')
const governance = readJson('data/v10-intelligent-world/governance-sovereignty.json')
const archive = readJson('data/v10-intelligent-world/continuity-archive.json')
const finalManifest = readJson('data/v10-intelligent-world/v10-final-manifest.json')

const errors = [
  ...checkStage(1, [1, 2, 3, 4]),
  ...checkStage(2, [5, 6, 7, 8]),
  ...checkStage(3, [9, 10, 11, 12]),
  ...checkStage(4, [13, 14, 15, 16]),
  ...checkRequiredFiles([
    'src/features/v10-intelligent-world/data.ts',
    'src/features/v10-intelligent-world/guards.ts',
    'src/components/v10-intelligence/V10IntelligenceHero.tsx',
    'src/components/v10-intelligence/V10IntelligenceDashboard.tsx',
    'src/components/v10-intelligence/V10StageBoard.tsx',
    'src/components/v10-intelligence/V10EvolutionMatrix.tsx',
    'src/components/v10-intelligence/V10FinalManifestPanel.tsx',
    'src/app/v10-intelligence/page.tsx',
    'src/app/api/v10/intelligence-health/route.ts',
    'docs/10-development-history/v10-intelligent-world/v10-round-10-all-tasks-and-extension-plan.md',
    'docs/10-development-history/v10-intelligent-world/v10-round-10-execution-report.md',
    'docs/10-development-history/v10-intelligent-world/quality-gates.md',
  ]),
  ...checkBoundary(),
]

if (roadmap.stages.length !== 4) errors.push('V10 roadmap must have 4 stages')
if (roadmap.batches.length !== 16) errors.push('V10 roadmap must have 16 batches')
if (extensions.items.length < 20) errors.push('V10 extension registry too small')
if (kernel.kernel.aiMode !== 'assistive-not-authoritative') errors.push('V10 AI mode must be assistive')
if (lifecycle.lifeStages.length < 9) errors.push('V10 lifecycle too small')
if (evolution.rules.some((rule: { autoExecute: boolean }) => rule.autoExecute !== false)) errors.push('V10 evolution must be suggest-only')
if (roles.roles.length < 6) errors.push('V10 AI roles too few')
if (governance.auditPolicy.appendOnly !== true) errors.push('V10 governance must be append-only')
if (archive.checksumsRequired !== true) errors.push('V10 archive must require checksums')
if (finalManifest.tenRoundClosure !== true) errors.push('V10 final manifest must close ten rounds')

failIfErrors(errors)
console.log('V10 intelligent world aggregate check passed.')

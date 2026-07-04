import deploymentRunbook from '../../../data/r1-production-stabilization/deployment-runbook.json'
import extensionRegistry from '../../../data/r1-production-stabilization/extension-registry.json'
import qualityGates from '../../../data/r1-production-stabilization/quality-gates.json'
import releaseCandidateManifest from '../../../data/r1-production-stabilization/release-candidate-manifest.json'
import riskLedger from '../../../data/r1-production-stabilization/risk-ledger.json'
import roadmap from '../../../data/r1-production-stabilization/roadmap.json'
import type { R1Card, R1Stage, R1Summary } from './types'

export const r1Roadmap = roadmap
export const r1Stages = roadmap.stages as R1Stage[]
export const r1Batches = roadmap.batches
export const r1Extensions = extensionRegistry.items
export const r1QualityGates = qualityGates
export const r1DeploymentRunbook = deploymentRunbook
export const r1ReleaseCandidateManifest = releaseCandidateManifest
export const r1RiskLedger = riskLedger

export function getR1Summary(): R1Summary {
  return {
    stages: r1Stages.length,
    batches: r1Batches.length,
    extensions: r1Extensions.length,
    smokeRoutes: r1DeploymentRunbook.previewSmokeRoutes.length,
    productionLive: Boolean(roadmap.productionLive),
    releaseReady: Boolean(roadmap.releaseReady),
    cleanProductionReady: Boolean(roadmap.cleanProductionReady),
  }
}

export function getR1Cards(): R1Card[] {
  return [
    { id: 'baseline', title: '最终基线统一', state: 'complete', description: '以 V10 完整结构包作为唯一工程基线，停止基于零散补丁继续扩散。' },
    { id: 'gates', title: '真实命令门禁', state: 'local-candidate', description: 'JSON、repo、R1 聚合、lint、typecheck、build、audit 都被纳入 R1 证据链。' },
    { id: 'deploy', title: '部署与 smoke 手册', state: 'external-pending', description: 'Preview 与 Production smoke 路径已经定义，等待真实外部部署环境执行。' },
    { id: 'rc', title: 'Release Candidate 交接', state: 'ready-for-r2', description: 'R1 不再新增大功能，把稳定工程基线交给 R2 世界入口与沉浸体验重构。' },
  ]
}

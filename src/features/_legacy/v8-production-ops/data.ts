import deploymentPipeline from '../../../data/v8-production-ops/deployment-pipeline.json'
import domainSeoPerformance from '../../../data/v8-production-ops/domain-seo-performance.json'
import environmentBoundary from '../../../data/v8-production-ops/environment-boundary.json'
import extensionRegistry from '../../../data/v8-production-ops/extension-registry.json'
import incidentResponse from '../../../data/v8-production-ops/incident-response.json'
import observabilityMatrix from '../../../data/v8-production-ops/observability-matrix.json'
import productionEvidenceLedger from '../../../data/v8-production-ops/production-evidence-ledger.json'
import roadmap from '../../../data/v8-production-ops/roadmap.json'
import signoffRollback from '../../../data/v8-production-ops/signoff-rollback.json'
import v9Handoff from '../../../data/v8-production-ops/v9-handoff.json'
import type { V8ProductionCard, V8ProductionSummary, V8Stage } from './types'

export const v8Roadmap = roadmap
export const v8Stages = roadmap.stages as V8Stage[]
export const v8Batches = roadmap.batches
export const v8Extensions = extensionRegistry.items
export const v8DeploymentPipeline = deploymentPipeline
export const v8EnvironmentBoundary = environmentBoundary
export const v8ObservabilityMatrix = observabilityMatrix
export const v8IncidentResponse = incidentResponse
export const v8DomainSeoPerformance = domainSeoPerformance
export const v8SignoffRollback = signoffRollback
export const v8ProductionEvidenceLedger = productionEvidenceLedger
export const v8V9Handoff = v9Handoff

export function getV8ProductionSummary(): V8ProductionSummary {
  return {
    stages: v8Stages.length,
    batches: v8Batches.length,
    extensions: v8Extensions.length,
    productionLive: Boolean(roadmap.productionLive),
    releaseReady: Boolean(roadmap.releaseReady),
  }
}

export function getV8ProductionCards(): V8ProductionCard[] {
  return [
    {
      id: 'deployment',
      title: '部署流水线',
      state: 'pending-real-environment',
      description: '已定义从依赖安装、本地门禁、构建、预览、生产到人工签收的证据链。',
    },
    {
      id: 'observability',
      title: '生产观测',
      state: 'pending-real-environment',
      description: '已规划 uptime、Web Vitals、构建健康、隐私和 AI 边界观测。',
    },
    {
      id: 'incident',
      title: '事故响应',
      state: 'ready',
      description: 'P0 到 P3 分级、止血、回滚、复盘和台账流程已落库。',
    },
    {
      id: 'signoff',
      title: '人工签收',
      state: 'manual-required',
      description: '生产发布、回滚和 productionLive 状态必须由人工确认。',
    },
    {
      id: 'v9-handoff',
      title: 'V9 交接',
      state: 'ready',
      description: '身份、RBAC、后端 API、真实审计和多端协作留给 V9。',
    },
  ]
}

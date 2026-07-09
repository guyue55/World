// 用途：生成 Phase 25 本地 Owner 只读指挥台账本。
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const OUT = 'data/domains/operations/owner-readonly-console-ledger.json'

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf-8'))
}

function countRoutes(routes, classification) {
  return routes.filter((route) => route.classification === classification).length
}

function gate(id, label, status, value, note) {
  return { id, label, status, value, note }
}

const contract = readJson('data/world-kernel/worldos-phase25-owner-readonly-console-contract-v1.json')
const localMaturity = readJson('data/domains/operations/local-maturity-ledger.json')
const pathQuality = readJson('data/domains/experience/path-journey-quality-ledger.json')
const apiRegistry = readJson('data/world-kernel/worldos-api-boundary-registry-v1.json')
const lighthouseStatus = readJson('data/domains/ai/lighthouse-local-status.json')
const auditReport = readJson('docs/90-archive/reports/npm-audit-report.json')

const routes = apiRegistry.routes ?? []
const ownerOnlyRoutes = countRoutes(routes, 'owner-only')
const permissionGuardedRoutes = countRoutes(routes, 'permission-guarded')
const mutatingRoutes = routes.filter((route) => (route.methods ?? []).some((method) => method !== 'GET')).length
const highAudit = auditReport.summary?.high ?? 0
const criticalAudit = auditReport.summary?.critical ?? 0
const localMaturityPassed = (localMaturity.gates ?? []).every((item) => item.status === 'passed')

const gates = [
  gate('local-rc', '本地 RC', localMaturityPassed ? 'passed' : 'failed', `${localMaturity.gates?.length ?? 0} gates`, 'Owner 先看本地/LAN 是否可信。'),
  gate('path-quality', '路径质量', pathQuality.status === 'passed' ? 'passed' : 'failed', `${pathQuality.metrics.publicPaths} paths`, '路径旅程质量必须先稳定。'),
  gate('owner-routes', 'Owner API', ownerOnlyRoutes >= contract.minimums.ownerOnlyRoutes ? 'passed' : 'failed', ownerOnlyRoutes, 'owner-only 能力必须进入注册表。'),
  gate('permission-routes', '权限 API', permissionGuardedRoutes >= contract.minimums.permissionGuardedRoutes ? 'passed' : 'failed', permissionGuardedRoutes, 'permission-guarded API 继续由服务端控制。'),
  gate('readonly-boundary', '只读边界', contract.scope.readonlyOnly && contract.scope.forbidWrites ? 'passed' : 'failed', 'readonly', 'Phase 25 不做写入动作。'),
  gate('ai-boundary', 'AI 边界', contract.scope.forbidRealAi && lighthouseStatus.realTimeAIProviderEnabled === false ? 'passed' : 'failed', lighthouseStatus.mode, '真实 AI Provider 继续 disabled。'),
  gate('audit-risk', '依赖审计', highAudit <= contract.minimums.highAuditMax && criticalAudit <= contract.minimums.criticalAuditMax ? 'passed' : 'failed', `${highAudit} high / ${criticalAudit} critical`, '高危和严重风险必须阻断外部发布。')
]

const ledger = {
  name: 'WorldOS Phase 25 本地 Owner 只读指挥台账本',
  generatedAt: new Date().toISOString(),
  status: gates.every((item) => item.status === 'passed') ? 'passed' : 'needs-review',
  scope: contract.scope,
  summary: 'Owner 只读指挥台聚合本地 RC、路径质量、API 边界、AI 低光和发布阻断状态；它只用于观察，不执行写入。',
  localAccess: {
    mode: localMaturity.localAccess?.mode,
    baseUrl: localMaturity.localAccess?.baseUrl,
    runtimeChecks: localMaturity.gates?.find((item) => item.id === 'runtime-smoke')?.value,
    lanHttpChecks: localMaturity.gates?.find((item) => item.id === 'lan-http')?.value,
    lanBrowserChecks: localMaturity.gates?.find((item) => item.id === 'lan-browser')?.value,
    screenshots: localMaturity.evidence?.screenshotCount
  },
  pathQuality: {
    status: pathQuality.status,
    publicPaths: pathQuality.metrics.publicPaths,
    averageNodesPerPath: pathQuality.metrics.averageNodesPerPath,
    multiAreaPaths: pathQuality.metrics.pathsWithMultipleAreas,
    pathsNeedingReview: pathQuality.metrics.pathsNeedingReview
  },
  sourceGates: {
    localMaturity: localMaturity.gates?.length ?? 0,
    pathQuality: pathQuality.gates?.length ?? 0
  },
  apiBoundary: {
    totalRoutes: routes.length,
    ownerOnlyRoutes,
    permissionGuardedRoutes,
    mutatingRoutes,
    summary: apiRegistry.summary
  },
  aiBoundary: {
    mode: lighthouseStatus.mode,
    realTimeAIProviderEnabled: lighthouseStatus.realTimeAIProviderEnabled,
    contextPolicy: lighthouseStatus.contextPolicy,
    readonly: true
  },
  audit: {
    total: auditReport.summary?.total ?? 0,
    moderate: auditReport.summary?.moderate ?? 0,
    high: highAudit,
    critical: criticalAudit
  },
  gates,
  nextActions: [
    'Owner 只读观察通过后，再规划 AI 导览适配层。',
    '任何写入能力都必须另建合同、审核队列和回滚策略。',
    '继续保持 external Preview / Production 阻断。'
  ],
  releaseStates: contract.releaseStates
}

fs.writeFileSync(path.join(ROOT, OUT), `${JSON.stringify(ledger, null, 2)}\n`)
console.log(`WorldOS owner readonly console ledger written: ${OUT}`)

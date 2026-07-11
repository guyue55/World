import fs from 'node:fs'
import path from 'node:path'
import controlManifest from '../../data/world-kernel/worldos-living-world-control-v1.json'
import executionState from '../../data/world-kernel/worldos-living-world-execution-state.json'

const riskGateLabels: Record<string, string> = {
  'content-projection': '内容投影门',
  'living-vertical-slice': '生命样板门',
  'sensory-prototype': '感官原型门',
  'extension-integrity': '扩展门',
}

type CompletedItem = {
  finishedAt: string
  evidence?: Array<{ path: string }>
}

const completedItems = executionState.completedItems as Record<string, CompletedItem>

function latestEvidence() {
  const records = Object.values(completedItems)
    .filter((record) => record.evidence?.[0]?.path)
    .sort((left, right) => Date.parse(right.finishedAt) - Date.parse(left.finishedAt))
  const evidencePath = records[0]?.evidence?.[0]?.path
  if (!evidencePath) return null
  const absolutePath = path.resolve(process.cwd(), evidencePath)
  if (!absolutePath.startsWith(`${process.cwd()}${path.sep}`) || !fs.existsSync(absolutePath)) return null
  return {
    path: evidencePath,
    recordedAt: fs.statSync(absolutePath).mtime.toISOString(),
  }
}

export function getLivingWorldStatus() {
  const firstOpenGate = executionState.riskGates.find((gate) => gate.status !== 'passed') ?? null
  const evidence = latestEvidence()
  const providerIntegrated = Boolean(completedItems['G.5'])

  return {
    productStatus: executionState.goal.status === 'COMPLETE'
      ? controlManifest.target.currentGoalFinal
      : controlManifest.baseline.status,
    targetStatus: controlManifest.target.currentGoalFinal,
    goalStatus: executionState.goal.status,
    currentItem: executionState.goal.currentItem,
    taskState: executionState.goal.taskState,
    firstOpenGate: firstOpenGate
      ? { id: firstOpenGate.id, label: riskGateLabels[firstOpenGate.id] ?? firstOpenGate.id, status: firstOpenGate.status }
      : null,
    latestEvidence: evidence,
    provider: {
      id: controlManifest.provider.id,
      model: controlManifest.provider.requiredModel,
      status: providerIntegrated ? '已接入，等待终局评测' : '服务已验证，产品待接入',
    },
    scope: 'localhost / LAN',
  }
}

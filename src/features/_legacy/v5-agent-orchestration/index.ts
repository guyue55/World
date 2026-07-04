export function getV5AgentOrchestrationFeatureStatus() {
  return {
    feature: 'v5-agent-orchestration',
    label: '多 Agent 编排与运行态队列',
    status: 'v5-structure-ready',
    productionLive: false,
  }
}

export * from './types'

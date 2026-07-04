import statusSkeletonContract from '../../data/core/status-skeleton-productization-contract.json'
import statusSkeletonQualityGate from '../../data/release/status-skeleton-quality-gate.json'
import stageCompletionGate from '../../data/release/stage-completion-gate.json'
import phaseTwoCharter from '../../data/versions/archive/phase-two-charter.json'

export function getStatusSkeletonContract() {
  return statusSkeletonContract
}

export function getStatusSkeletonQualityGate() {
  return statusSkeletonQualityGate
}

export function getStatusSummaryCards() {
  const externalRequired = stageCompletionGate.completionGates.filter((gate) => gate.status === 'external-required').length
  const prepared = stageCompletionGate.completionGates.filter((gate) => gate.status === 'prepared').length

  return [
    {
      id: 'phase-one',
      label: '第一阶段',
      value: stageCompletionGate.currentStatus,
      description: '仍需真实 lint / typecheck / build / QA / preview 证据。',
    },
    {
      id: 'phase-two',
      label: '第二阶段',
      value: phaseTwoCharter.status,
      description: '真实体验开发已启动，但不替代第一阶段验收。',
    },
    {
      id: 'prepared-gates',
      label: '已准备门禁',
      value: String(prepared),
      description: '已有脚本或契约，可在真实环境执行。',
    },
    {
      id: 'external-gates',
      label: '待真实执行',
      value: String(externalRequired),
      description: '必须在真实项目、浏览器或预览环境完成。',
    },
  ]
}

export function getSkeletonLayers() {
  return [
    {
      id: 'space',
      title: '空间层',
      description: 'Atlas、Area、二维结构和区域星线让世界可被看见。',
    },
    {
      id: 'content',
      title: '内容层',
      description: 'Node、正文、封面、标签和摘要让星体可被阅读。',
    },
    {
      id: 'relation',
      title: '关系层',
      description: 'Relation、Backlinks、ForwardLinks 和同区域 fallback 让节点不孤立。',
    },
    {
      id: 'time',
      title: '时间层',
      description: 'Timeline 记录世界事件、阶段变化和生长痕迹。',
    },
    {
      id: 'projection',
      title: '投影层',
      description: '首页、档案馆、路径、节点详情把世界协议投影成页面。',
    },
    {
      id: 'governance',
      title: '治理层',
      description: '质量门槛、检查脚本、文档登记和阶段门禁避免世界失控。',
    },
    {
      id: 'ai-boundary',
      title: 'AI 边界层',
      description: 'AI 是灯塔，不是太阳；低光模式先提供安全导览。',
    },
  ]
}

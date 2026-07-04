import policy from '../../data/domains/governance/lifecycle-policy.json'
import type { LifeStage, Node } from './types'

export type LifeStageTransition = {
  from: LifeStage
  to: LifeStage
  allowed: boolean
  reason: string
}

export function getAllowedNextStages(stage: LifeStage): LifeStage[] {
  return (policy.allowedTransitions as Record<LifeStage, LifeStage[]>)[stage] ?? []
}

export function canTransitionLifeStage(from: LifeStage, to: LifeStage): LifeStageTransition {
  const allowed = getAllowedNextStages(from).includes(to)

  return {
    from,
    to,
    allowed,
    reason: allowed
      ? `${from} 可以转换为 ${to}。`
      : `${from} 不应直接转换为 ${to}，需要经过中间生命阶段。`,
  }
}

export function isHomeFeatureStageAllowed(node: Node): boolean {
  if (!node.featured?.home) return true
  return node.lifeStage !== 'seed' && node.lifeStage !== 'silent'
}

export function isCorePathStageAllowed(node: Node): boolean {
  if (!node.featured?.pathCore) return true
  return ['bloom', 'fruit', 'growing'].includes(node.lifeStage)
}

export function explainLifeStage(stage: LifeStage): string {
  const notes: Record<LifeStage, string> = {
    seed: '刚被安放的种子，需要后续浇水。',
    sprout: '已经开始发芽，有了初步方向。',
    growing: '仍在持续生长，可以继续扩写或重构。',
    bloom: '已经可以被旅人阅读和引用。',
    fruit: '沉淀为成熟结果，可以作为路径核心。',
    archive: '已进入档案馆，不再活跃但可以回望。',
    relic: '旧时代留下的遗迹，保留历史价值。',
    dormant: '处于低光沉睡，等待未来复活。',
    silent: '被允许保持沉默，不主动展示。',
  }

  return notes[stage]
}

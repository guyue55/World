import aiAgentRoles from '../../../data/v10-intelligent-world/ai-agent-roles.json'
import companionContinuity from '../../../data/v10-intelligent-world/companion-continuity.json'
import continuityArchive from '../../../data/v10-intelligent-world/continuity-archive.json'
import evolutionRules from '../../../data/v10-intelligent-world/evolution-rules.json'
import extensionRegistry from '../../../data/v10-intelligent-world/extension-registry.json'
import governanceSovereignty from '../../../data/v10-intelligent-world/governance-sovereignty.json'
import intelligenceKernel from '../../../data/v10-intelligent-world/intelligence-kernel.json'
import memoryLifecycle from '../../../data/v10-intelligent-world/memory-lifecycle.json'
import qualityResilience from '../../../data/v10-intelligent-world/quality-resilience.json'
import roadmap from '../../../data/v10-intelligent-world/roadmap.json'
import finalManifestData from '../../../data/v10-intelligent-world/v10-final-manifest.json'
import type { V10IntelligenceCard, V10Stage, V10Summary } from './types'

export const v10Roadmap = roadmap
export const v10Stages = roadmap.stages as V10Stage[]
export const v10Batches = roadmap.batches
export const v10Extensions = extensionRegistry.items
export const v10IntelligenceKernel = intelligenceKernel
export const v10MemoryLifecycle = memoryLifecycle
export const v10EvolutionRules = evolutionRules
export const v10AiAgentRoles = aiAgentRoles
export const v10CompanionContinuity = companionContinuity
export const v10GovernanceSovereignty = governanceSovereignty
export const v10ContinuityArchive = continuityArchive
export const v10QualityResilience = qualityResilience
export const v10FinalManifest = finalManifestData

export function getV10Summary(): V10Summary {
  return {
    stages: v10Stages.length,
    batches: v10Batches.length,
    extensions: v10Extensions.length,
    aiRoles: v10AiAgentRoles.roles.length,
    lifeStages: v10MemoryLifecycle.lifeStages.length,
    productionLive: Boolean(roadmap.productionLive),
    cleanProductionReady: Boolean(roadmap.cleanProductionReady),
  }
}

export function getV10IntelligenceCards(): V10IntelligenceCard[] {
  return [
    { id: 'kernel', title: '长期智能世界内核', state: 'ready', description: '以世界状态、四维坐标、生命周期和隐私边界承载长期记忆。' },
    { id: 'evolution', title: '自演化规则引擎', state: 'designed', description: '世界可以生成维护建议、回望提示和低光提醒，但所有动作保持建议态。' },
    { id: 'agents', title: 'AI 角色社会', state: 'manual-required', description: '灯塔、书记官、园丁、星图师、守门人和镜子都必须遵守不可越权协议。' },
    { id: 'continuity', title: '长期陪伴与回望', state: 'designed', description: '今日世界、时光回声、年度世界册和未来的我共同形成连续性体验。' },
    { id: 'sovereignty', title: '主权与传承', state: 'ready', description: '内容、数据、解释、隐私、AI、时间、审美和维护主权都显式写入治理层。' },
  ]
}

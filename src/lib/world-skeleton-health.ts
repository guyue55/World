import { getWorldCore, summarizeWorldCore, WORLD_LAYERS } from './world-core'
import { evaluateWorldGovernance, governanceScore } from './governance'
import { getPublicStarGraph } from './star-lines'
import { getHomeProjections, getTimelineProjectionCount } from './projections'

export type SkeletonCheck = {
  id: string
  title: string
  passed: boolean
  detail: string
}

export type WorldSkeletonHealth = {
  score: number
  checks: SkeletonCheck[]
  summary: ReturnType<typeof summarizeWorldCore>
}

function check(id: string, title: string, passed: boolean, detail: string): SkeletonCheck {
  return { id, title, passed, detail }
}

export function evaluateWorldSkeletonHealth(): WorldSkeletonHealth {
  const core = getWorldCore()
  const graph = getPublicStarGraph()
  const governanceIssues = evaluateWorldGovernance()
  const summary = summarizeWorldCore(core)
  const homeProjections = getHomeProjections()
  const timelineProjectionCount = getTimelineProjectionCount()

  const checks: SkeletonCheck[] = [
    check(
      'layers',
      '世界层级完整',
      WORLD_LAYERS.length >= 7,
      `当前定义 ${WORLD_LAYERS.length} 个世界层级。`,
    ),
    check(
      'areas',
      '主区域完整',
      core.areas.length >= 8,
      `当前 ${core.areas.length} 个区域。`,
    ),
    check(
      'nodes',
      '首批节点可用',
      core.publicNodes.length >= 12,
      `当前 ${core.publicNodes.length} 个公开/半公开节点。`,
    ),
    check(
      'relations',
      '星线关系可追溯',
      graph.lines.length >= 6,
      `当前 ${graph.lines.length} 条公开星线。`,
    ),
    check(
      'paths',
      '探索路径成立',
      core.paths.length >= 3,
      `当前 ${core.paths.length} 条公开路径。`,
    ),
    check(
      'events',
      '时间河有源头',
      core.events.length >= 5 && timelineProjectionCount >= 5,
      `当前 ${core.events.length} 个世界事件。`,
    ),
    check(
      'home-projections',
      '首页投影成立',
      homeProjections.length >= 5,
      `当前 ${homeProjections.length} 个首页投影。`,
    ),
    check(
      'governance',
      '治理层没有阻断错误',
      !governanceIssues.some((issue) => issue.severity === 'error'),
      `当前 ${governanceIssues.length} 个治理提醒，得分 ${governanceScore(governanceIssues)}。`,
    ),
  ]

  const passRatio = checks.filter((item) => item.passed).length / checks.length
  const score = Math.round(passRatio * 70 + governanceScore(governanceIssues) * 0.3)

  return {
    score,
    checks,
    summary,
  }
}

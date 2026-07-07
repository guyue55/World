// 用途：检查世界骨架
import { evaluateWorldSkeletonHealth } from '../src/lib/world-skeleton-health'
import { evaluateWorldGovernance } from '../src/lib/governance'
import { getPublicStarGraph } from '../src/lib/star-lines'
import { getWorldCore, WORLD_LAYERS } from '../src/lib/world-core'

function main() {
  const core = getWorldCore()
  const graph = getPublicStarGraph()
  const health = evaluateWorldSkeletonHealth()
  const issues = evaluateWorldGovernance()

  const errors = issues.filter((issue) => issue.severity === 'error')

  if (WORLD_LAYERS.length < 7) {
    throw new Error(`Expected at least 7 world layers, got ${WORLD_LAYERS.length}`)
  }

  if (core.areas.length < 8) {
    throw new Error(`Expected at least 8 areas, got ${core.areas.length}`)
  }

  if (core.publicNodes.length < 12) {
    throw new Error(`Expected at least 12 public/semiPublic nodes, got ${core.publicNodes.length}`)
  }

  if (core.paths.length < 3) {
    throw new Error(`Expected at least 3 public paths, got ${core.paths.length}`)
  }

  if (core.events.length < 5) {
    throw new Error(`Expected at least 5 world events, got ${core.events.length}`)
  }

  if (graph.lines.length < 6) {
    throw new Error(`Expected at least 6 public star lines, got ${graph.lines.length}`)
  }

  if (errors.length > 0) {
    throw new Error(`World governance has blocking errors: ${errors.map((issue) => issue.id).join(', ')}`)
  }

  console.log(`World skeleton check passed. score=${health.score}`)
}

main()

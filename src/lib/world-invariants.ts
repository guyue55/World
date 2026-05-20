import registry from '../../data/core/world-protocol-registry.json'
import { getAllAreas } from './areas'
import { getAllNodes, getPublicNodes } from './nodes'
import { getAllPaths } from './paths'
import { getAllRelations } from './relations'
import { getAllWorldEvents } from './world-events'
import { getPublicStarGraph } from './star-lines'
import { getBlockingRuleFailures, runWorldRules } from './rules'
import { WORLD_LAYERS } from './world-core'

export type InvariantResult = {
  id: string
  passed: boolean
  expected: string
  actual: string
}

function invariant(id: string, passed: boolean, expected: string, actual: string): InvariantResult {
  return { id, passed, expected, actual }
}

export function evaluateWorldInvariants(): InvariantResult[] {
  const minimums = registry.minimums
  const areas = getAllAreas()
  const nodes = getAllNodes()
  const publicNodes = getPublicNodes()
  const paths = getAllPaths()
  const relations = getAllRelations()
  const events = getAllWorldEvents()
  const publicGraph = getPublicStarGraph()
  const ruleResults = runWorldRules()
  const blockingFailures = getBlockingRuleFailures(ruleResults)

  return [
    invariant('minimum-world-layers', WORLD_LAYERS.length >= minimums.worldLayers, `>= ${minimums.worldLayers} layers`, `${WORLD_LAYERS.length} layers`),
    invariant('minimum-areas', areas.length >= minimums.areas, `>= ${minimums.areas} areas`, `${areas.length} areas`),
    invariant('minimum-public-nodes', publicNodes.length >= minimums.publicNodes, `>= ${minimums.publicNodes} public/semiPublic nodes`, `${publicNodes.length} public/semiPublic nodes`),
    invariant('minimum-relations', relations.length >= minimums.relations, `>= ${minimums.relations} relations`, `${relations.length} relations`),
    invariant('minimum-public-star-lines', publicGraph.lines.length >= minimums.relations, `>= ${minimums.relations} public star lines`, `${publicGraph.lines.length} public star lines`),
    invariant('minimum-paths', paths.length >= minimums.paths, `>= ${minimums.paths} paths`, `${paths.length} paths`),
    invariant('minimum-world-events', events.length >= minimums.worldEvents, `>= ${minimums.worldEvents} world events`, `${events.length} world events`),
    invariant('no-blocking-rule-failures', blockingFailures.length === 0, '0 blocking failures', `${blockingFailures.length} blocking failures`),
    invariant(
      'nodes-have-area',
      nodes.every((node) => areas.some((area) => area.id === node.areaId)),
      'every node references an existing area',
      `${nodes.filter((node) => !areas.some((area) => area.id === node.areaId)).length} invalid node area refs`,
    ),
  ]
}

export function assertWorldInvariants(): void {
  const failed = evaluateWorldInvariants().filter((item) => !item.passed)

  if (failed.length > 0) {
    throw new Error(
      failed.map((item) => `${item.id}: expected ${item.expected}, got ${item.actual}`).join('\n'),
    )
  }
}

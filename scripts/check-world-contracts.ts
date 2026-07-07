// 用途：检查世界契约
import { getAllNodes } from '../src/lib/nodes'
import { getAllPaths } from '../src/lib/paths'
import { canTransitionLifeStage, isCorePathStageAllowed, isHomeFeatureStageAllowed } from '../src/lib/lifecycle'
import { validateAllWorldEventContracts } from '../src/lib/event-contracts'
import { getSchemaVersionReport } from '../src/lib/schema-version'
import { createSnapshotPlan } from '../src/lib/snapshots'

function main() {
  const nodes = getAllNodes()
  const paths = getAllPaths()
  const errors: string[] = []

  nodes.forEach((node) => {
    if (!isHomeFeatureStageAllowed(node)) {
      errors.push(`Node ${node.id} is not allowed to be featured on home at stage ${node.lifeStage}`)
    }

    if (!isCorePathStageAllowed(node)) {
      errors.push(`Node ${node.id} is not allowed to be core path node at stage ${node.lifeStage}`)
    }
  })

  paths.forEach((path) => {
    if (path.nodeSlugs.length === 0) {
      errors.push(`Path ${path.id} has no nodes`)
    }
  })

  const invalidTransition = canTransitionLifeStage('seed', 'fruit')
  if (invalidTransition.allowed) {
    errors.push('seed should not directly transition to fruit')
  }

  const eventIssues = validateAllWorldEventContracts()
  eventIssues.forEach((issue) => errors.push(`Event ${issue.eventId}: ${issue.message}`))

  const schema = getSchemaVersionReport()
  if (!schema.current) errors.push('Missing current schema version')

  const snapshot = createSnapshotPlan('contract-check')
  if (!snapshot.name.includes(schema.current)) errors.push('Snapshot name should include schema version')

  if (errors.length > 0) {
    throw new Error(errors.join('\n'))
  }

  console.log(`World contracts passed. nodes=${nodes.length}, paths=${paths.length}, schema=${schema.current}`)
}

main()

// 用途：检查运维配置
import { getRuntimeStates, getRuntimeTransitions } from '../src/lib/runtime-protocol'
import { getErrorCategories, getErrorLevels } from '../src/lib/error-taxonomy'
import { createObservabilitySnapshot } from '../src/lib/observability'
import { getMaintenanceCadences, getRecoveryPaths } from '../src/lib/maintenance'

function main() {
  const errors: string[] = []

  const states = new Set(getRuntimeStates().map((state) => state.id))
  getRuntimeTransitions().forEach((transition) => {
    if (!states.has(transition.from)) errors.push(`transition from missing state: ${transition.from}`)
    if (!states.has(transition.to)) errors.push(`transition to missing state: ${transition.to}`)
  })

  const levels = new Set(getErrorLevels().map((level) => level.id))
  getErrorCategories().forEach((category) => {
    if (!levels.has(category.defaultLevel)) errors.push(`category default level missing: ${category.id}`)
  })

  const snapshot = createObservabilitySnapshot()
  if (snapshot.metrics.length < 8) errors.push('observability metrics are too few')
  if (getMaintenanceCadences().length < 4) errors.push('maintenance cadence is incomplete')
  if (getRecoveryPaths().length < 5) errors.push('recovery playbook is incomplete')

  if (errors.length > 0) {
    throw new Error(errors.join('\n'))
  }

  console.log(`Operations check passed. states=${states.size}, metrics=${snapshot.metrics.length}`)
}

main()

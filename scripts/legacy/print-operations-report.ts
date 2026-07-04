import { getRuntimeStates } from '../src/lib/runtime-protocol'
import { createObservabilitySnapshot } from '../src/lib/observability'
import { getMaintenanceCadences, getRecoveryPaths } from '../src/lib/maintenance'

function main() {
  console.log(`Runtime states: ${getRuntimeStates().map((state) => state.id).join(', ')}`)

  console.log('Observability:')
  createObservabilitySnapshot().metrics.forEach((metric) => {
    console.log(`- ${metric.id}: ${metric.value} target ${metric.target}`)
  })

  console.log('Maintenance:')
  getMaintenanceCadences().forEach((cadence) => {
    console.log(`- ${cadence.id}: ${cadence.tasks.join(' / ')}`)
  })

  console.log(`Recovery paths: ${getRecoveryPaths().length}`)
}

main()

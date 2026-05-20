import performanceExecutionContract from '../data/performance-execution-contract.json'
import performanceMeasurementRecords from '../data/performance-measurement-records.json'

function main() {
  console.log(`# ${performanceExecutionContract.name}`)
  console.log(`stageProgress=${performanceExecutionContract.stageProgress}`)
  console.log('')
  console.log('## Routes')
  performanceMeasurementRecords.routes.forEach((route) => {
    console.log(`- ${route.device}: ${route.route} -> ${route.status}`)
  })
  console.log('')
  console.log(`metrics=${performanceExecutionContract.requiredMetrics.join(', ')}`)
  console.log('Reminder: this command prints the performance plan only; it does not mark metrics as measured.')
}

main()

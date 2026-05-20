import browserQaExecutionContract from '../data/domains/experience/browser-qa-execution-contract.json'
import browserQaRecords from '../data/domains/experience/browser-qa-records.json'
import browserQaRouteCoverage from '../data/domains/experience/browser-qa-route-coverage.json'

function main() {
  console.log(`# ${browserQaExecutionContract.name}`)
  console.log(`stageProgress=${browserQaExecutionContract.stageProgress}`)
  console.log('')
  console.log('## Viewport matrix')
  browserQaRecords.matrix.forEach((item) => {
    console.log(`- ${item.viewport}: ${item.routes.join(', ')}`)
    console.log(`  checks: ${item.checkedItems.join(' | ')}`)
  })
  console.log('')
  console.log('## Route coverage')
  browserQaRouteCoverage.routes.forEach((route) => {
    console.log(`- ${route.route}: ${route.coverageCount} viewport(s) -> ${route.viewports.join(', ')}`)
  })
  console.log('')
  console.log('Reminder: this command prints the QA plan only; it does not mark anything as passed.')
}

main()

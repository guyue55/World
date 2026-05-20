import phaseThreeQaExpansionContract from '../data/phase-three-qa-expansion-contract.json'
import browserQaRouteCoverage from '../data/browser-qa-route-coverage.json'

function main() {
  console.log(`${phaseThreeQaExpansionContract.name}`)
  console.log(`stageProgress=${phaseThreeQaExpansionContract.stageProgress}`)
  phaseThreeQaExpansionContract.newRoutes.forEach((route) => {
    const coverage = browserQaRouteCoverage.routes.find((item) => item.route === route)
    console.log(`${route}: ${coverage?.coverageCount ?? 0} viewport(s)`)
  })
}

main()

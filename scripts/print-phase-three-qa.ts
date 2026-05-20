import phaseThreeQaExpansionContract from '../data/release/phase-three-qa-expansion-contract.json'
import browserQaRouteCoverage from '../data/domains/experience/browser-qa-route-coverage.json'

function main() {
  console.log(`${phaseThreeQaExpansionContract.name}`)
  console.log(`stageProgress=${phaseThreeQaExpansionContract.stageProgress}`)
  phaseThreeQaExpansionContract.newRoutes.forEach((route) => {
    const coverage = browserQaRouteCoverage.routes.find((item) => item.route === route)
    console.log(`${route}: ${coverage?.coverageCount ?? 0} viewport(s)`)
  })
}

main()

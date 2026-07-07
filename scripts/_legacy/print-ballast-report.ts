import {
  getAntiFragilityStrategy,
  getFutureStressTests,
  getLongTermInvariants,
  getPrincipleCheckMap,
  getWorldCharterRuntime,
} from '../src/lib/ballast'

function main() {
  console.log(`Charter articles: ${getWorldCharterRuntime().charterArticles.length}`)
  console.log(`Principle mappings: ${getPrincipleCheckMap().mappings.length}`)
  console.log(`Long-term invariants: ${getLongTermInvariants().invariants.length}`)
  console.log(`Anti-fragility strategies: ${getAntiFragilityStrategy().strategies.length}`)
  console.log(`Future stress tests: ${getFutureStressTests().scenarios.length}`)
}

main()

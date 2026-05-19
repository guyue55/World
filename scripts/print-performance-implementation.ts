import {
  getCacheStrategy,
  getCriticalPathContract,
  getRuntimeSplitContract,
  getStaticAssetPolicy,
} from '../src/lib/performance-implementation'

function main() {
  const critical = getCriticalPathContract()
  const assets = getStaticAssetPolicy()
  const cache = getCacheStrategy()
  const split = getRuntimeSplitContract()

  console.log(`${critical.name}`)
  console.log(`critical routes=${critical.routes.length}`)
  critical.routes.forEach((route) => console.log(`- ${route.route}: critical=${route.critical.length}, defer=${route.defer.length}`))

  console.log(`asset policies=${assets.assetKinds.length}`)
  console.log(`cache strategies=${cache.strategies.length}`)
  console.log(`split targets=${split.splitTargets.length}`)
}

main()

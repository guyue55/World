import releaseEnvironmentContract from '../data/release-environment-contract.json'
import releaseConfig from '../data/release-config.json'

function main() {
  console.log(`${releaseEnvironmentContract.name}`)
  console.log(`stageProgress=${releaseEnvironmentContract.stageProgress}`)
  console.log(`platformTargets=${releaseEnvironmentContract.platformTargets.join(', ')}`)
  console.log(`buildCommand=${releaseConfig.build.buildCommand}`)
  console.log(`promotionStatus=${releaseConfig.releasePromotion.status}`)
}

main()

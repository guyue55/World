import phaseThreeRouteIntegrationContract from '../data/phase-three-route-integration-contract.json'
import phaseThreeImplementationRoutes from '../data/phase-three-implementation-routes.json'

function main() {
  console.log(`${phaseThreeRouteIntegrationContract.name}`)
  console.log(`stageProgress=${phaseThreeRouteIntegrationContract.stageProgress}`)
  console.log(`integratedRoutes=${phaseThreeRouteIntegrationContract.routes.length}`)
  console.log(`registeredRoutes=${phaseThreeImplementationRoutes.routes.length}`)
  console.log(`routes=${phaseThreeRouteIntegrationContract.routes.map((route) => route.route).join(', ')}`)
}

main()

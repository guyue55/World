import scope from '../../data/v2/stage-01/01-v2-scope-contract.json'
import topology from '../../data/v2/stage-01/02-v2-service-topology.json'
import monorepo from '../../data/v2/stage-01/03-v2-monorepo-module-boundary.json'
import finalReport from '../../data/v2/stage-01/04-v2-stage-one-final.json'

export function getV2PlatformArchitecture() {
  return {
    scope,
    topology,
    monorepo,
    finalReport,
    summary: {
      stage: 1,
      services: topology.services.length,
      packages: monorepo.packages.length,
      ready: false,
    },
  }
}

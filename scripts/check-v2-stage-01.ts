import scope from '../data/v2/stage-01/01-v2-scope-contract.json'
import topology from '../data/v2/stage-01/02-v2-service-topology.json'
import monorepo from '../data/v2/stage-01/03-v2-monorepo-module-boundary.json'
import finalReport from '../data/v2/stage-01/04-v2-stage-one-final.json'

const errors: string[] = []

if (scope.stage !== 1 || scope.batch !== 1) errors.push('scope stage/batch mismatch')
if (scope.focus.length < 8) errors.push('scope focus too small')
if (!scope.nonGoals.includes('store secrets in repo')) errors.push('secret boundary missing')
if (topology.services.length < 8) errors.push('service topology too small')
if (!topology.services.includes('vault-service')) errors.push('vault service missing')
if (monorepo.packages.length < 8) errors.push('monorepo packages too few')
if (finalReport.decision !== 'v2-service-architecture-structure-complete-stage-two-allowed') {
  errors.push('stage one final decision mismatch')
}

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V2 stage 01 check passed.')

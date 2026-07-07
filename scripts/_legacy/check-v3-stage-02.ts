import bridge from '../data/v3/stage-02/07-v3-space-bridge-policy.json'
import finalReport from '../data/v3/stage-02/08-v3-stage-two-final.json'
import identity from '../data/v3/stage-02/06-v3-collaborative-identity.json'
import spaces from '../data/v3/stage-02/05-v3-multi-space-model.json'

const errors: string[] = []

if (!spaces.spaces.includes('private-vault')) errors.push('private-vault space missing')
if (!identity.actors.includes('ai-companion')) errors.push('ai companion missing')
if (!bridge.blockedBridges.includes('private-to-public-auto')) errors.push('private-to-public-auto must be blocked')
if (!bridge.blockedBridges.includes('ai-to-private-raw')) errors.push('ai raw private bridge must be blocked')
if (finalReport.decision !== 'v3-multi-space-collaboration-complete-stage-three-allowed') {
  errors.push('stage two final decision mismatch')
}

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V3 stage 02 check passed.')

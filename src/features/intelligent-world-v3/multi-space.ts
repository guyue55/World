import bridge from '../../../data/v3/stage-02/07-v3-space-bridge-policy.json'
import finalReport from '../../../data/v3/stage-02/08-v3-stage-two-final.json'
import identity from '../../../data/v3/stage-02/06-v3-collaborative-identity.json'
import spaces from '../../../data/v3/stage-02/05-v3-multi-space-model.json'

export function getV3MultiSpaceModel() {
  return {
    spaces,
    identity,
    bridge,
    finalReport,
    summary: {
      stage: 2,
      spaces: spaces.spaces.length,
      actors: identity.actors.length,
      bridges: bridge.bridges.length,
      blockedBridges: bridge.blockedBridges.length,
      ready: false,
    },
  }
}

export function canBridgeSpace(bridgeId: string) {
  return bridge.bridges.includes(bridgeId)
}

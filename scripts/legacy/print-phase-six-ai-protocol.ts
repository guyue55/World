import aiPermissionMatrix from '../data/domains/ai/ai-permission-matrix.json'
import aiReadableProtocol from '../data/domains/ai/ai-readable-protocol.json'

function main() {
  console.log(`${aiReadableProtocol.name}`)
  console.log(`stageProgress=${aiReadableProtocol.stageProgress}`)
  console.log(`readableTiers=${aiReadableProtocol.readableTiers.length}`)
  console.log(`forbiddenTiers=${aiReadableProtocol.forbiddenTiers.length}`)
  console.log(`allowedActions=${aiReadableProtocol.allowedActions.length}`)
  console.log(`humanRequiredActions=${aiReadableProtocol.humanRequiredActions.length}`)
  console.log(`permissions=${aiPermissionMatrix.permissions.length}`)
}

main()

import statusSkeletonContract from '../data/status-skeleton-productization-contract.json'
import stageCompletionGate from '../data/stage-completion-gate.json'

function main() {
  console.log(`${statusSkeletonContract.name}`)
  console.log(`groups=${statusSkeletonContract.groups.length}`)
  console.log(`pageParts=${statusSkeletonContract.pageParts.length}`)
  console.log(`stageOneStatus=${stageCompletionGate.currentStatus}`)
}

main()

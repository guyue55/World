import releaseBlockerClosureAssistContract from '../data/release/release-blocker-closure-assist-contract.json'
import releaseBlockerClosureRequests from '../data/release/release-blocker-closure-requests.json'
import releaseBlockerRegister from '../data/release/release-blocker-register.json'

function main() {
  console.log(`${releaseBlockerClosureAssistContract.name}`)
  console.log(`stageProgress=${releaseBlockerClosureAssistContract.stageProgress}`)
  console.log(`allowedStatuses=${releaseBlockerClosureAssistContract.allowedStatuses.length}`)
  console.log(`requests=${releaseBlockerClosureRequests.requests.length}`)
  console.log(`openBlockers=${releaseBlockerRegister.blockers.filter((blocker) => blocker.status !== 'closed').length}`)
}

main()

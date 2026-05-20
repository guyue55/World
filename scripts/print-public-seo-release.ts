import publicSeoReleaseContract from '../data/public-seo-release-contract.json'
import publicSeoReleaseRecord from '../data/public-seo-release-record.json'

function main() {
  console.log(`${publicSeoReleaseContract.name}`)
  console.log(`stageProgress=${publicSeoReleaseContract.stageProgress}`)
  console.log(`publicArtifacts=${publicSeoReleaseContract.publicArtifacts.length}`)
  console.log(`forbiddenVisibility=${publicSeoReleaseContract.forbiddenVisibility.join(', ')}`)
  console.log(`recordStatus=${publicSeoReleaseRecord.status}`)
}

main()

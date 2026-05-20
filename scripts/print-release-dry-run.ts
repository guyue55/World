import releaseDryRunContract from '../data/release/release-dry-run-contract.json'

function main() {
  console.log(`${releaseDryRunContract.name}`)
  console.log(`stageProgress=${releaseDryRunContract.stageProgress}`)
  console.log(`steps=${releaseDryRunContract.dryRunSteps.length}`)
  console.log(`output=${releaseDryRunContract.output}`)
  releaseDryRunContract.dryRunSteps.forEach((step, index) => {
    console.log(`${index + 1}. ${step.id}: ${step.command}`)
  })
}

main()

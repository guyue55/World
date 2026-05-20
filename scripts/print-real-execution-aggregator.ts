import realExecutionAggregatorContract from '../data/real-execution-aggregator-contract.json'

function main() {
  console.log(`${realExecutionAggregatorContract.name}`)
  console.log(`stageProgress=${realExecutionAggregatorContract.stageProgress}`)
  console.log(`inputs=${realExecutionAggregatorContract.inputs.length}`)
  console.log(`output=${realExecutionAggregatorContract.output}`)
}

main()

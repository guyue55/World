import { getBuildPipeline } from '../src/lib/build-pipeline'

function main() {
  const pipeline = getBuildPipeline()

  console.log(`Build pipeline v${pipeline.version}`)
  console.log(pipeline.principle)

  pipeline.stages.forEach((stage, index) => {
    const flag = stage.blocksBuild ? 'blocking' : 'non-blocking'
    console.log(`${index + 1}. [${flag}] ${stage.id}: ${stage.command}`)
  })
}

main()

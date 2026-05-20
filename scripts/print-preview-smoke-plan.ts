import previewSmokeExecutionContract from '../data/release/preview-smoke-execution-contract.json'
import previewSmokeConfig from '../data/release/preview-smoke-config.json'

function main() {
  console.log(`# ${previewSmokeExecutionContract.name}`)
  console.log(`stageProgress=${previewSmokeExecutionContract.stageProgress}`)
  console.log('')
  console.log(`Required env: ${previewSmokeConfig.previewUrlEnv}`)
  console.log('')
  console.log('## Routes')
  previewSmokeConfig.routes.forEach((route) => {
    console.log(`- ${route.route}: ${route.status}`)
  })
  console.log('')
  console.log(`Run: ${previewSmokeExecutionContract.env.example}`)
  console.log('Reminder: printing this plan does not mark preview smoke as passed.')
}

main()

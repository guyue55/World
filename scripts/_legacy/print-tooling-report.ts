import { getToolingBaseline } from '../src/lib/tooling-baseline'

function main() {
  const baseline = getToolingBaseline()

  console.log(`${baseline.name}`)
  console.log(baseline.principle)
  console.log(`Node: ${baseline.runtime.node}`)
  console.log(`Package manager: ${baseline.runtime.packageManager}`)
  console.log(`Required files: ${baseline.requiredFiles.join(', ')}`)
  console.log(`Required scripts: ${baseline.requiredScripts.join(', ')}`)
  console.log(`Required devDependencies: ${baseline.requiredDevDependencies.join(', ')}`)
}

main()

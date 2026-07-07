// 用途：运行release local gate
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import releaseGateContract from '../data/release/release-gate-contract.json'

const commands = [
  ['npm', ['run', 'check:lint-env']],
  ['npm', ['run', 'lint']],
  ['npm', ['run', 'typecheck']],
  ['npm', ['run', 'check:world-core']],
  ['npm', ['run', 'build']],
  ['npm', ['run', 'validation-closure:print']],
] as const

function main() {
  const root = process.cwd()
  const hasNodeModules = fs.existsSync(path.join(root, 'node_modules'))
  const hasLockFile = fs.existsSync(path.join(root, 'package-lock.json'))

  console.log(`# ${releaseGateContract.name}`)
  console.log(`stageProgress=${releaseGateContract.stageProgress}`)
  console.log(`nodeModules=${hasNodeModules ? 'present' : 'missing'}`)
  console.log(`packageLock=${hasLockFile ? 'present' : 'missing'}`)

  if (!hasNodeModules) {
    console.log('Missing node_modules. Run npm install before npm run release:local-gate.')
    process.exit(2)
  }

  for (const [command, args] of commands) {
    const printable = `${command} ${args.join(' ')}`
    console.log(`\n$ ${printable}`)
    const result = spawnSync(command, args, { stdio: 'inherit', shell: process.platform === 'win32' })

    if (result.status !== 0) {
      console.log(`Release local gate failed at: ${printable}`)
      process.exit(result.status ?? 1)
    }
  }

  console.log('Release local gate passed.')
}

main()

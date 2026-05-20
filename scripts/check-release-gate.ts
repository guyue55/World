import fs from 'node:fs'
import path from 'node:path'
import releaseGateContract from '../data/release-gate-contract.json'
import releaseGateRecord from '../data/release-gate-record.json'
import releaseBlockerRegister from '../data/release-blocker-register.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function main() {
  const errors: string[] = []

  if (releaseGateContract.requiredCommands.length < 7) {
    errors.push('release gate required commands too few')
  }

  ;['npm run lint', 'npm run typecheck', 'npm run check:world-core', 'npm run build'].forEach((command) => {
    if (!releaseGateContract.requiredCommands.includes(command)) {
      errors.push(`release gate missing command: ${command}`)
    }
  })

  if (!exists(releaseGateContract.ciWorkflow)) {
    errors.push(`missing CI workflow: ${releaseGateContract.ciWorkflow}`)
  }

  const workflow = read(releaseGateContract.ciWorkflow)
  ;['npm run lint', 'npm run typecheck', 'npm run check:world-core', 'npm run build'].forEach((command) => {
    if (!workflow.includes(command)) errors.push(`CI workflow missing command: ${command}`)
  })

  if (releaseGateRecord.status !== 'pending-real-ci-run') {
    errors.push('release gate record must remain pending until real CI runs')
  }

  if (!releaseBlockerRegister.blockers.some((blocker) => blocker.source === 'real-execution')) {
    errors.push('release blockers must include real-execution')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['release:local-gate']) errors.push('package missing release:local-gate')
  if (!pkg.scripts['check:release-gate']) errors.push('package missing check:release-gate')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Release gate check passed.')
}

main()

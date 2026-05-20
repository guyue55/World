import fs from 'node:fs'
import path from 'node:path'
import releaseEnvironmentContract from '../data/release-environment-contract.json'
import releaseConfig from '../data/release-config.json'
import releaseBlockerRegister from '../data/release-blocker-register.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function main() {
  const errors: string[] = []

  if (!exists('vercel.json')) errors.push('missing vercel.json')
  if (!exists('.env.example')) errors.push('missing .env.example')

  if (releaseEnvironmentContract.environmentVariables.length < 2) {
    errors.push('release environment variables too few')
  }

  if (!releaseEnvironmentContract.publicBoundaryRules.some((rule) => rule.includes('private'))) {
    errors.push('release environment must mention private visibility boundary')
  }

  if (releaseConfig.releasePromotion.status !== 'blocked') {
    errors.push('release promotion must remain blocked until real evidence exists')
  }

  if (releaseBlockerRegister.blockers.filter((blocker) => blocker.status !== 'closed').length < 4) {
    errors.push('release blockers should remain open')
  }

  const statusGroups = read('src/components/status-skeleton/StatusFoundationGroups.tsx')
  if (!statusGroups.includes('ReleaseEnvironmentPanel')) {
    errors.push('status groups must include ReleaseEnvironmentPanel')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:release-environment']) errors.push('package missing check:release-environment')
  if (!pkg.scripts['release-environment:print']) errors.push('package missing release-environment:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Release environment check passed.')
}

main()

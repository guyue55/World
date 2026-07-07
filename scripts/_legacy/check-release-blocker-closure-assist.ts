import fs from 'node:fs'
import path from 'node:path'
import releaseBlockerClosureAssistContract from '../data/release/release-blocker-closure-assist-contract.json'
import releaseBlockerClosureRequests from '../data/release/release-blocker-closure-requests.json'
import releaseBlockerRegister from '../data/release/release-blocker-register.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (!releaseBlockerClosureAssistContract.allowedStatuses.includes('draft')) {
    errors.push('closure assist must include draft status')
  }

  if (releaseBlockerClosureRequests.status !== 'no-approved-closures') {
    errors.push('closure requests must not be approved by default')
  }

  if (releaseBlockerClosureRequests.requests.length !== 0) {
    errors.push('closure requests must start empty')
  }

  if (releaseBlockerRegister.blockers.filter((blocker) => blocker.status !== 'closed').length < 1) {
    errors.push('open release blockers must remain visible')
  }

  const evidencePage = read('src/app/evidence/page.tsx')
  if (!evidencePage.includes('BlockerClosurePanel')) {
    errors.push('evidence page must include BlockerClosurePanel')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:blocker-closure-assist']) errors.push('package missing check:blocker-closure-assist')
  if (!pkg.scripts['blocker-closure:print']) errors.push('package missing blocker-closure:print')
  if (!pkg.scripts['blocker-closure:request']) errors.push('package missing blocker-closure:request')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Release blocker closure assist check passed.')
}

main()

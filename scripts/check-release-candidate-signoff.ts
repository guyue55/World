import fs from 'node:fs'
import path from 'node:path'
import releaseCandidateSignoffContract from '../data/release-candidate-signoff-contract.json'
import releaseCandidateSignoffRecord from '../data/release-candidate-signoff-record.json'
import releaseCandidateFreezeRecord from '../data/release-candidate-freeze-record.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (releaseCandidateSignoffContract.checklist.length < 9) {
    errors.push('signoff checklist too short')
  }

  if (releaseCandidateSignoffContract.checklist.filter((item) => item.required).length < 9) {
    errors.push('all signoff checklist items should be required')
  }

  if (releaseCandidateSignoffRecord.status !== 'pending-signoff') {
    errors.push('signoff record must remain pending-signoff')
  }

  if (releaseCandidateSignoffRecord.items.some((item) => item.status !== 'pending')) {
    errors.push('signoff items must start pending')
  }

  if (releaseCandidateSignoffRecord.releaseDecision !== 'not-ready-for-release') {
    errors.push('signoff record must keep not-ready-for-release')
  }

  if (releaseCandidateFreezeRecord.releaseDecision !== 'not-ready-for-release') {
    errors.push('freeze record must keep not-ready-for-release')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:release-candidate-signoff']) errors.push('package missing check:release-candidate-signoff')
  if (!pkg.scripts['release-candidate-signoff:print']) errors.push('package missing release-candidate-signoff:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Release candidate signoff check passed.')
}

main()

import fs from 'node:fs'
import path from 'node:path'
import realEvidenceCaptureContract from '../data/real-evidence-capture-contract.json'
import realEvidenceCaptureRecord from '../data/real-evidence-capture-record.json'
import releaseReadyMatrix from '../data/release-ready-matrix.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (realEvidenceCaptureContract.commands.length < 6) {
    errors.push('real evidence capture commands too few')
  }

  ;['lint', 'typecheck', 'world-core', 'build', 'release-local-gate'].forEach((id) => {
    if (!realEvidenceCaptureContract.commands.some((item) => item.id === id && item.required)) {
      errors.push(`required evidence command missing: ${id}`)
    }
  })

  if (realEvidenceCaptureRecord.status !== 'pending-real-run') {
    errors.push('real evidence capture record must remain pending until real run')
  }

  if (releaseReadyMatrix.status !== 'not-ready') {
    errors.push('release ready matrix must remain not-ready')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['evidence:capture']) errors.push('package missing evidence:capture')
  if (!pkg.scripts['check:real-evidence-capture']) errors.push('package missing check:real-evidence-capture')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Real evidence capture check passed.')
}

main()

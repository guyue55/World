// 用途：约束客观证据检查器只回算冻结字段，不信任 manifest 自报状态或体验分。
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'

const checkerSource = fs.readFileSync('scripts/check-worldos-reality-first.mjs', 'utf8')
const evidenceSource = fs.readFileSync('scripts/evidence-worldos-reality-first.mjs', 'utf8')
const permissionSource = fs.readFileSync('scripts/check-worldos-permission-boundary.mjs', 'utf8')
const failures = []

function assert(condition, message) {
  if (!condition) failures.push(message)
}

assert(checkerSource.includes('data/domains/experience/living-world-acceptance.json'), 'objective checker does not consume living-world acceptance')
assert(!checkerSource.includes('data/domains/experience/reality-first-route-contract.json'), 'objective checker still consumes legacy route contract')
assert(!checkerSource.includes("manifest.status === 'objective-evidence-captured'"), 'objective checker trusts manifest status')
assert(checkerSource.includes('forbiddenScoreKeys'), 'objective checker does not reject scores')
assert(checkerSource.includes('screenshotSha256'), 'objective checker does not recalculate screenshot hash')
assert(checkerSource.includes("'background-hidden'"), 'objective checker does not verify background-hidden')
assert(checkerSource.includes('primarySubjectRect'), 'objective checker does not verify the primary subject bounding box')
assert(evidenceSource.includes('acceptanceContract.views.map'), 'evidence modes are not derived from frozen views')
assert(permissionSource.includes("process.argv.includes('--check-only')"), 'permission checker lacks side-effect-free mode')

if (failures.length === 0) {
  const selfTest = spawnSync(process.execPath, ['scripts/check-worldos-reality-first.mjs', '--self-test'], { encoding: 'utf8' })
  const output = `${selfTest.stdout ?? ''}${selfTest.stderr ?? ''}`.trim()
  if (selfTest.status !== 0 || !output.includes('OBJECTIVE_EVIDENCE_SELF_TEST_PASS')) {
    failures.push(`objective checker self-test failed: ${output}`)
  }
}

if (failures.length) {
  console.error(`OBJECTIVE_EVIDENCE_BOUNDARY_FAIL findings=${failures.length}`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log('OBJECTIVE_EVIDENCE_BOUNDARY_PASS manifestStatusTrusted=false visualScoreAccepted=false')

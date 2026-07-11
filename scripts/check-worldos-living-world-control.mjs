// 用途：冻结生命世界 Goal 的价值与验收，并校验执行计划和账本恢复指针。
import crypto from 'node:crypto'
import { execFileSync, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const bootstrap = process.argv.includes('--bootstrap')
const manifestPath = path.join(root, 'data/world-kernel/worldos-living-world-control-v1.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
const failures = []
const expectedAuthority = [
  'AGENTS.md',
  'docs/00-overview/worldos-meta-control-contract-2026-07-11.md',
  'docs/00-overview/worldos-living-world-experience-acceptance-2026-07-11.md',
  'docs/03-engineering-architecture/worldos-living-world-architecture-data-contract-2026-07-11.md',
  'docs/00-overview/worldos-living-world-execution-plan-2026-07-11.md',
  'docs/00-overview/worldos-living-world-execution-ledger-2026-07-11.md',
]
const expectedFrozenPaths = [
  'AGENTS.md',
  'docs/README.md',
  'docs/00-overview/worldos-meta-control-contract-2026-07-11.md',
  'docs/00-overview/worldos-living-world-experience-acceptance-2026-07-11.md',
  'docs/03-engineering-architecture/worldos-living-world-architecture-data-contract-2026-07-11.md',
  'docs/00-overview/worldos-living-world-execution-plan-2026-07-11.md',
  'docs/00-overview/worldos-living-world-one-shot-goal-prompt-2026-07-11.md',
  'data/domains/experience/living-world-acceptance.json',
]
const expectedMutablePaths = [
  'docs/00-overview/worldos-living-world-execution-ledger-2026-07-11.md',
  'data/world-kernel/worldos-living-world-execution-state.json',
]
const expectedTargets = {
  currentGoalFinal: 'LOCAL_LIVING_WORLD_CANDIDATE_AI_FALLBACK_HUMAN_AUDIO_PENDING',
  automaticWithoutHumanAudioSignoff: 'LOCAL_LIVING_WORLD_CANDIDATE_AI_FALLBACK_HUMAN_AUDIO_PENDING',
  fallbackWithHumanAudioSignoff: 'LOCAL_LIVING_WORLD_CANDIDATE_AI_FALLBACK',
  providerWithHumanAudioSignoff: 'LOCAL_LIVING_WORLD_CANDIDATE_AI_PROVIDER',
  promotionOutsideGoalRequired: true,
}

function read(relativePath) {
  const absolutePath = path.join(root, relativePath)
  if (!fs.existsSync(absolutePath)) {
    failures.push(`missing control file: ${relativePath}`)
    return ''
  }
  return fs.readFileSync(absolutePath, 'utf8')
}

function normalize(content, mode) {
  if (mode === 'checkbox-status-only') {
    return content.replace(/^- \[[ xX]\] (?=\*\*[A-H]\.\d+\*\*)/gm, '- [ ] ')
  }
  return content
}

function hash(content) {
  return crypto.createHash(manifest.algorithm).update(content).digest('hex')
}

function resolveMutableArtifact(relativePath) {
  if (!relativePath) return null
  const absolutePath = path.resolve(root, relativePath)
  if (!absolutePath.startsWith(`${root}${path.sep}`) || !fs.existsSync(absolutePath) || fs.lstatSync(absolutePath).isSymbolicLink() || !fs.statSync(absolutePath).isFile()) return null
  const realPath = fs.realpathSync(absolutePath)
  if (!realPath.startsWith(`${fs.realpathSync(root)}${path.sep}`)) return null
  return realPath
}

function readAtCommit(commit, relativePath) {
  try {
    return execFileSync('git', ['show', `${commit}:${relativePath}`], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    })
  } catch {
    failures.push(`control baseline cannot read ${relativePath} at ${commit}`)
    return ''
  }
}

function normalizeManifest(content) {
  const value = JSON.parse(content)
  value.controlBaselineCommit = null
  return JSON.stringify(value)
}

function blockerPolicyValid({ goalStatus, blockerKind, externalStreak, designStreak }) {
  if (goalStatus !== 'BLOCKED') return true
  if (blockerKind === 'design-review-required') return designStreak >= 3
  return blockerKind !== 'none' && externalStreak >= 3
}

if (!blockerPolicyValid({ goalStatus: 'BLOCKED', blockerKind: 'design-review-required', externalStreak: 0, designStreak: 3 })
  || blockerPolicyValid({ goalStatus: 'BLOCKED', blockerKind: 'design-review-required', externalStreak: 0, designStreak: 2 })
  || !blockerPolicyValid({ goalStatus: 'BLOCKED', blockerKind: 'external-secret', externalStreak: 3, designStreak: 0 })) {
  failures.push('internal blocker policy regression')
}

if (manifest.version !== '1.0.0') failures.push(`unexpected manifest version: ${manifest.version}`)
if (JSON.stringify(manifest.authority) !== JSON.stringify(expectedAuthority)) {
  failures.push('manifest authority set changed')
}
if (JSON.stringify(manifest.frozenFiles.map((entry) => entry.path)) !== JSON.stringify(expectedFrozenPaths)) {
  failures.push('manifest frozen file set changed')
}
if (JSON.stringify(manifest.mutableFiles) !== JSON.stringify(expectedMutablePaths)) {
  failures.push('manifest mutable file set changed')
}
if (JSON.stringify(manifest.target) !== JSON.stringify(expectedTargets)) {
  failures.push('manifest target status ladder changed')
}
if (manifest.acceptanceContract?.path !== 'data/domains/experience/living-world-acceptance.json') {
  failures.push('manifest acceptance contract path changed')
}
if (!manifest.controlBaselineCommit && !bootstrap) {
  failures.push('control baseline is not anchored; Goal cannot start')
}
if (manifest.controlBaselineCommit && bootstrap) {
  failures.push('bootstrap mode is forbidden after the control baseline is anchored')
}

const checkerContent = read(manifest.checker?.path ?? 'missing-checker')
if (checkerContent && hash(checkerContent) !== manifest.checker?.sha256) {
  failures.push('control checker changed')
}
const finalVerifierContent = read(manifest.finalVerifier?.path ?? 'missing-final-verifier')
if (finalVerifierContent && hash(finalVerifierContent) !== manifest.finalVerifier?.sha256) {
  failures.push('final evidence verifier changed')
}

for (const entry of manifest.frozenFiles) {
  const content = normalize(read(entry.path), entry.mode)
  if (!content) continue
  const actual = hash(content)
  if (actual !== entry.sha256) {
    failures.push(`frozen control changed: ${entry.path} (${entry.mode})`)
  }
}

if (manifest.controlBaselineCommit) {
  const manifestRelativePath = path.relative(root, manifestPath)
  const baselineManifest = readAtCommit(manifest.controlBaselineCommit, manifestRelativePath)
  if (baselineManifest && normalizeManifest(baselineManifest) !== normalizeManifest(fs.readFileSync(manifestPath, 'utf8'))) {
    failures.push('control manifest differs from approved baseline')
  }
  for (const entry of manifest.frozenFiles) {
    const baselineContent = readAtCommit(manifest.controlBaselineCommit, entry.path)
    if (baselineContent && normalize(baselineContent, entry.mode) !== normalize(read(entry.path), entry.mode)) {
      failures.push(`control file differs from approved baseline: ${entry.path}`)
    }
  }
  const baselineChecker = readAtCommit(manifest.controlBaselineCommit, manifest.checker.path)
  if (baselineChecker && baselineChecker !== checkerContent) {
    failures.push('control checker differs from approved baseline')
  }
  const baselineFinalVerifier = readAtCommit(manifest.controlBaselineCommit, manifest.finalVerifier.path)
  if (baselineFinalVerifier && baselineFinalVerifier !== finalVerifierContent) {
    failures.push('final evidence verifier differs from approved baseline')
  }
}

const contractValidation = spawnSync(process.execPath, [manifest.finalVerifier.path, '--contract-only'], {
  cwd: root,
  encoding: 'utf8',
})
if (contractValidation.status !== 0) {
  failures.push(`machine acceptance contract failed: ${(contractValidation.stderr || contractValidation.stdout).trim()}`)
}

for (const requiredPath of [...manifest.authority, ...manifest.mutableFiles, ...manifest.referenceOnly]) {
  read(requiredPath)
}

const planContent = read(manifest.plan.path)
const taskPattern = /^- \[([ xX])\] \*\*([A-H]\.\d+)\*\*/gm
const tasks = [...planContent.matchAll(taskPattern)].map((match) => ({
  checked: match[1].toLowerCase() === 'x',
  id: match[2],
}))
const taskIds = tasks.map((task) => task.id)

if (tasks.length !== manifest.plan.totalItems) {
  failures.push(`plan item count drift: expected=${manifest.plan.totalItems} actual=${tasks.length}`)
}
if (new Set(taskIds).size !== taskIds.length) {
  failures.push('plan contains duplicate item ids')
}

for (const checkpoint of manifest.plan.checkpoints) {
  const items = tasks.filter((task) => task.id.startsWith(`${checkpoint.id}.`))
  if (items.length !== checkpoint.count) {
    failures.push(`checkpoint ${checkpoint.id} count drift: expected=${checkpoint.count} actual=${items.length}`)
    continue
  }
  if (items[0]?.id !== checkpoint.first || items.at(-1)?.id !== checkpoint.last) {
    failures.push(`checkpoint ${checkpoint.id} range drift: expected=${checkpoint.first}-${checkpoint.last}`)
  }
}

let seenUnchecked = false
for (const task of tasks) {
  if (!task.checked) seenUnchecked = true
  if (seenUnchecked && task.checked) {
    failures.push(`plan completion is not contiguous at ${task.id}`)
    break
  }
}

const firstUnchecked = tasks.find((task) => !task.checked)?.id ?? 'none'
const ledgerContent = read(manifest.plan.ledgerPath)
let executionState = null
try {
  executionState = JSON.parse(read(manifest.plan.executionStatePath))
} catch (error) {
  failures.push(`execution state is not valid JSON: ${error.message}`)
}
const currentItem = ledgerContent.match(/^current_item:\s*([^\n]+)$/m)?.[1]?.trim()
const nextItem = ledgerContent.match(/^next_item:\s*([^\n]+)$/m)?.[1]?.trim()
const ledgerField = (name) => ledgerContent.match(new RegExp(`^${name}:\\s*([^\\n]+)$`, 'm'))?.[1]?.trim()
const goalStatus = ledgerField('goal_status')
const goalId = ledgerField('goal_id')
const goalStartedAt = ledgerField('goal_started_at')
const currentCheckpoint = ledgerField('current_checkpoint')
const taskState = ledgerField('task_state')
const activeRecordId = ledgerField('active_record_id')
const resumeAction = ledgerField('resume_action')
const blockerKind = ledgerField('blocker_kind')
const blockerStreak = Number(ledgerField('same_external_blocker_streak'))
const designFailureStreak = Number(ledgerField('same_design_gate_failure_streak'))
const expectedCheckpoint = firstUnchecked === 'none' ? 'none' : firstUnchecked.slice(0, 1)

if (currentItem !== firstUnchecked) {
  failures.push(`ledger current_item mismatch: expected=${firstUnchecked} actual=${currentItem ?? 'missing'}`)
}
if (nextItem !== firstUnchecked) {
  failures.push(`ledger next_item mismatch: expected=${firstUnchecked} actual=${nextItem ?? 'missing'}`)
}
if (currentCheckpoint !== expectedCheckpoint) {
  failures.push(`ledger current_checkpoint mismatch: expected=${expectedCheckpoint} actual=${currentCheckpoint ?? 'missing'}`)
}
if (!['NOT_STARTED', 'IN_PROGRESS', 'BLOCKED', 'COMPLETE'].includes(goalStatus)) {
  failures.push(`invalid ledger goal_status: ${goalStatus ?? 'missing'}`)
}
if (!['pending', 'in_progress', 'blocked', 'complete'].includes(taskState)) {
  failures.push(`invalid ledger task_state: ${taskState ?? 'missing'}`)
}
if (!resumeAction?.includes(firstUnchecked)) {
  failures.push(`ledger resume_action does not reference ${firstUnchecked}`)
}
if (!ledgerField('last_successful_command')) failures.push('ledger last_successful_command missing')

if (goalStatus === 'NOT_STARTED') {
  if (goalId !== 'not-created' || goalStartedAt !== 'null' || taskState !== 'pending') {
    failures.push('NOT_STARTED ledger identity or task state is inconsistent')
  }
}
if (goalStatus === 'IN_PROGRESS') {
  if (!goalId || goalId === 'not-created' || goalStartedAt === 'null' || activeRecordId === 'none') {
    failures.push('IN_PROGRESS ledger identity or active record is incomplete')
  }
}
if (!blockerPolicyValid({ goalStatus, blockerKind, externalStreak: blockerStreak, designStreak: designFailureStreak })) {
  failures.push('BLOCKED streak does not match blocker kind')
}
if (firstUnchecked !== 'none' && goalStatus === 'COMPLETE') {
  failures.push('Goal cannot be COMPLETE while plan items remain')
}

if (executionState) {
  if (executionState.schemaVersion !== '1.0.0' || executionState.planId !== 'worldos-living-world-a-h-2026-07-11') {
    failures.push('execution state identity drift')
  }
  if (executionState.goal?.status !== goalStatus
    || executionState.goal?.id !== goalId
    || String(executionState.goal?.startedAt) !== goalStartedAt
    || executionState.goal?.currentItem !== firstUnchecked
    || executionState.goal?.taskState !== taskState) {
    failures.push('execution state goal pointer differs from ledger or plan')
  }

  const completedItems = executionState.completedItems ?? {}
  const checkedIds = tasks.filter((task) => task.checked).map((task) => task.id)
  if (JSON.stringify(Object.keys(completedItems)) !== JSON.stringify(checkedIds)) {
    failures.push('execution state completed item set differs from checked plan items')
  }

  const commitsByHash = new Map()
  if (manifest.controlBaselineCommit) {
    try {
      const commitRows = execFileSync('git', ['log', '--format=%H%x00%s%x00%cI', `${manifest.controlBaselineCommit}..HEAD`], {
        cwd: root,
        encoding: 'utf8',
      }).split('\n').filter(Boolean)
      for (const row of commitRows) {
        const [commitHash, subject, committedAt] = row.split('\0')
        commitsByHash.set(commitHash, { subject, committedAt })
      }
    } catch {
      failures.push('cannot inspect commits after control baseline')
    }
  }

  const usedCommitHashes = new Set()
  const usedCommandLogHashes = new Set()
  const usedEvidenceHashes = new Set()
  for (const itemId of checkedIds) {
    const record = completedItems[itemId]
    if (record?.status !== 'passed' || record?.itemId !== itemId) failures.push(`invalid completed item record: ${itemId}`)
    if (!Number.isFinite(Date.parse(record?.startedAt)) || !Number.isFinite(Date.parse(record?.finishedAt)) || Date.parse(record.finishedAt) < Date.parse(record.startedAt)) {
      failures.push(`invalid completed item timestamps: ${itemId}`)
    }
    if (!Array.isArray(record?.commands) || record.commands.length === 0) failures.push(`completed item has no commands: ${itemId}`)
    for (const command of record?.commands ?? []) {
      if (typeof command.command !== 'string' || command.exitCode !== 0 || !/^[a-f0-9]{64}$/.test(command.outputSha256 ?? '')) {
        failures.push(`invalid command attestation: ${itemId}`)
        continue
      }
      const logPath = resolveMutableArtifact(command.logPath)
      if (!logPath || hash(fs.readFileSync(logPath)) !== command.outputSha256) {
        failures.push(`command log hash mismatch: ${itemId}`)
      }
      if (usedCommandLogHashes.has(command.outputSha256)) failures.push(`completed items cannot reuse a command log: ${itemId}`)
      usedCommandLogHashes.add(command.outputSha256)
    }
    if (!Array.isArray(record?.evidence) || record.evidence.length === 0) failures.push(`completed item has no evidence: ${itemId}`)
    for (const evidence of record?.evidence ?? []) {
      const evidencePath = resolveMutableArtifact(evidence.path)
      if (!evidencePath || !/^[a-f0-9]{64}$/.test(evidence.sha256 ?? '') || hash(fs.readFileSync(evidencePath)) !== evidence.sha256) {
        failures.push(`evidence hash mismatch: ${itemId}`)
      }
      if (usedEvidenceHashes.has(evidence.sha256)) failures.push(`completed items cannot reuse the same evidence artifact: ${itemId}`)
      usedEvidenceHashes.add(evidence.sha256)
    }
    if (!/^(?:feat|fix|refactor|test|docs)\(world\): .*[\u3400-\u9fff]/u.test(record?.commitSubject ?? '')) {
      failures.push(`invalid Chinese commit subject: ${itemId}`)
    }
    if (!/^[a-f0-9]{40}$/.test(record?.commitHash ?? '')) {
      failures.push(`invalid completed item commit hash: ${itemId}`)
    } else if (manifest.controlBaselineCommit) {
      const commit = commitsByHash.get(record.commitHash)
      if (!commit || commit.subject !== record.commitSubject) failures.push(`completed item commit identity mismatch: ${itemId}`)
      if (usedCommitHashes.has(record.commitHash)) failures.push(`completed items cannot reuse an implementation commit: ${itemId}`)
      usedCommitHashes.add(record.commitHash)
      if (commit && Date.parse(commit.committedAt) < Date.parse(record.finishedAt)) failures.push(`completed item commit predates its finish time: ${itemId}`)
    }
  }
}

for (const gate of manifest.riskGates) {
  const row = ledgerContent.split('\n').find((line) => line.includes(`| ${gate.ledger} |`))
  if (!row || !/\|\s*(?:pending|in_progress|failed|passed|blocked_external)\s*\|/.test(row)) {
    failures.push(`ledger risk gate status missing: ${gate.id}`)
  }
  if (firstUnchecked === 'none' && !/\|\s*passed\s*\|/.test(row ?? '')) {
    failures.push(`completed plan requires passed risk gate: ${gate.id}`)
  }
  const machineGate = executionState?.riskGates?.find((candidate) => candidate.id === gate.id)
  const ledgerGateStatus = row?.split('|').map((value) => value.trim())[3]
  if (!machineGate || machineGate.status !== ledgerGateStatus || machineGate.maxAttemptsBeforeDesignReview !== 3) {
    failures.push(`execution state risk gate differs from ledger: ${gate.id}`)
  }
  if ((machineGate?.attemptCount ?? 0) >= 3 && machineGate.status !== 'passed') {
    if (goalStatus !== 'BLOCKED' || blockerKind !== 'design-review-required' || designFailureStreak < 3) {
      failures.push(`three failed ${gate.id} experiments require BLOCKED_DESIGN_REVIEW_REQUIRED`)
    }
    if (!machineGate.lastFailedHypothesis || !machineGate.removalPath) {
      failures.push(`blocked risk gate lacks failed hypothesis or removal path: ${gate.id}`)
    }
  }
  if ((machineGate?.attemptCount ?? 0) > 3 && machineGate.status !== 'passed') {
    failures.push(`fourth failed experiment is forbidden before Goal-external design review: ${gate.id}`)
  }
  const gateFailures = (executionState?.failedAttempts ?? []).filter((attempt) => attempt.gateId === gate.id)
  if (gateFailures.length !== (machineGate?.attemptCount ?? 0)) {
    failures.push(`risk gate attempt count differs from failed attempts: ${gate.id}`)
  }
  for (const attempt of gateFailures) {
    if (!attempt.id || !attempt.hypothesisId || attempt.result !== 'failed' || !attempt.startedAt || !attempt.finishedAt || !attempt.evidenceSha256 || !attempt.removalPath) {
      failures.push(`risk gate failed attempt is incomplete: ${gate.id}`)
    }
  }
}

if (firstUnchecked === 'none') {
  const requiredCompletionFields = manifest.completionEvidence.requiredLedgerFields
  for (const field of requiredCompletionFields) {
    const value = ledgerField(field)
    if (!value || value === 'null' || value === 'none') failures.push(`completion ledger field missing: ${field}`)
  }
  if (ledgerField('independent_review_1_id') === ledgerField('independent_review_2_id')) {
    failures.push('final independent reviews must use different reviewer contexts')
  }
  if (goalStatus !== 'COMPLETE' || taskState !== 'complete') {
    failures.push('all checked items require COMPLETE goal and task state')
  }
  const finalEvidenceValidation = spawnSync(process.execPath, [manifest.finalVerifier.path], {
    cwd: root,
    encoding: 'utf8',
  })
  if (finalEvidenceValidation.status !== 0) {
    failures.push(`all checked items require final evidence verification: ${(finalEvidenceValidation.stderr || finalEvidenceValidation.stdout).trim()}`)
  }
}

const placeholderPattern = /\b(?:TBD|TODO|FIXME)\b|待定|后续补充/g
for (const entry of manifest.frozenFiles) {
  const matches = read(entry.path).match(placeholderPattern)
  if (matches?.length) failures.push(`placeholder found in ${entry.path}: ${matches.join(', ')}`)
}

const metaControl = read('docs/00-overview/worldos-meta-control-contract-2026-07-11.md')
const prompt = read('docs/00-overview/worldos-living-world-one-shot-goal-prompt-2026-07-11.md')
const agents = read('AGENTS.md')
const docsReadme = read('docs/README.md')

for (const requiredText of [
  manifest.baseline.status,
  manifest.baseline.invalidatedCompletionClaim,
  ...Object.values(manifest.target).filter((value) => typeof value === 'string'),
  'LONG_LIVED_WORLD',
]) {
  if (!metaControl.includes(requiredText)) failures.push(`meta control missing required claim: ${requiredText}`)
}

for (const requiredPath of manifest.authority.slice(1)) {
  if (!agents.includes(requiredPath)) failures.push(`AGENTS.md missing authority path: ${requiredPath}`)
}
for (const requiredPath of [manifest.plan.path, manifest.plan.ledgerPath]) {
  if (!prompt.includes(requiredPath)) failures.push(`Goal prompt missing execution path: ${requiredPath}`)
}
if (!prompt.includes('node scripts/check-worldos-living-world-control.mjs')) {
  failures.push('Goal prompt missing control checker command')
}
if (!prompt.includes('node scripts/verify-worldos-living-world-final.mjs')) {
  failures.push('Goal prompt missing final evidence verifier command')
}
if (!read('docs/00-overview/worldos-living-world-experience-acceptance-2026-07-11.md').includes(manifest.acceptanceContract.path)) {
  failures.push('experience acceptance does not reference the frozen machine contract')
}
if (!docsReadme.includes('worldos-living-world-one-shot-goal-prompt-2026-07-11.md')) {
  failures.push('docs/README.md does not route to the active Goal prompt')
}
if (docsReadme.includes('当前开发唯一入口是 [WorldOS Reality-First')) {
  failures.push('docs/README.md still declares the old Goal as active')
}

if (failures.length > 0) {
  console.error(`Living World control check failed with ${failures.length} finding(s).`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

if (bootstrap) {
  console.log(`BOOTSTRAP_READY_NOT_ANCHORED frozen=${manifest.frozenFiles.length} tasks=${tasks.length} next=${firstUnchecked}`)
  process.exit(0)
}

console.log(
  `CONTROL_INTEGRITY_PASS frozen=${manifest.frozenFiles.length} tasks=${tasks.length} next=${firstUnchecked} anchor=${manifest.controlBaselineCommit ?? 'pending'} productCompletion=not-evaluated`,
)

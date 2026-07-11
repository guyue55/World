import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const root = process.cwd()
const selfTest = process.argv.includes('--self-test')
const pointerPath = process.env.WORLDOS_EVIDENCE_POINTER || 'docs/90-archive/reports/worldos-reality-first/latest-evidence.json'
const contractPath = 'data/domains/experience/living-world-acceptance.json'
const contract = JSON.parse(fs.readFileSync(path.join(root, contractPath), 'utf8'))
const forbiddenScoreKeys = new Set(['score', 'experiencescore', 'visualscore', 'rating', 'candidatethreshold'])
const forbiddenPublicCopy = ['Motion Layer', 'Fallback', 'Evidence', '场景证据', '候选验收', '9/10', '8.9', '降级规则', '验收报告']
const sourceRoots = ['src', 'data', 'content', 'scripts', 'public/world', 'package.json', 'next.config.ts']

const routeFiles = {
  gateway: 'src/app/page.tsx',
  atlas: 'src/app/atlas/page.tsx',
  timeline: 'src/app/timeline/page.tsx',
  archive: 'src/app/archive/page.tsx',
  paths: 'src/app/paths/[id]/page.tsx',
  node: 'src/app/node/[slug]/page.tsx',
  lighthouse: 'src/app/ask/page.tsx',
}

function exists(relativePath) {
  return typeof relativePath === 'string' && fs.existsSync(path.join(root, relativePath))
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'))
}

function fileHash(relativePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(path.join(root, relativePath))).digest('hex')
}

function latestMtime(relativeRoots) {
  let latest = 0
  const visit = (absolutePath) => {
    if (!fs.existsSync(absolutePath)) return
    const stat = fs.statSync(absolutePath)
    if (stat.isDirectory()) {
      for (const child of fs.readdirSync(absolutePath)) visit(path.join(absolutePath, child))
    } else latest = Math.max(latest, stat.mtimeMs)
  }
  relativeRoots.forEach((relativePath) => visit(path.join(root, relativePath)))
  return latest
}

function visibleCopyLine(line, phrase) {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const withoutExpressions = line.replace(/\{[^{}]*\}/g, '')
  return new RegExp(`>[^<]*${escaped}[^<]*<`).test(withoutExpressions)
    || new RegExp(`(?:title|label|description|caption|note)=?[{]?['\"][^'\"]*${escaped}`, 'i').test(line)
}

function collectActivePublicSources() {
  const files = []
  const visit = (absolutePath) => {
    if (!fs.existsSync(absolutePath)) return
    const stat = fs.statSync(absolutePath)
    if (stat.isDirectory()) {
      if (absolutePath.includes(`${path.sep}_legacy`) || absolutePath.includes(`${path.sep}status`)) return
      for (const child of fs.readdirSync(absolutePath)) visit(path.join(absolutePath, child))
    } else if (/\.(?:ts|tsx)$/.test(absolutePath)) files.push(absolutePath)
  }
  visit(path.join(root, 'src/app'))
  visit(path.join(root, 'src/components'))
  return files
}

function collectForbiddenScorePaths(value, currentPath = '$', findings = []) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectForbiddenScorePaths(item, `${currentPath}[${index}]`, findings))
    return findings
  }
  if (!value || typeof value !== 'object') return findings
  for (const [key, child] of Object.entries(value)) {
    if (forbiddenScoreKeys.has(key.toLowerCase())) findings.push(`${currentPath}.${key}`)
    collectForbiddenScorePaths(child, `${currentPath}.${key}`, findings)
  }
  return findings
}

function resourceBytes(entries, pattern) {
  return (entries ?? [])
    .filter((entry) => pattern.test(entry.name ?? '') || (pattern.source.includes('webp') && String(entry.name).includes('/_next/image')))
    .reduce((sum, entry) => sum + Number(entry.transferSize || entry.encodedBodySize || 0), 0)
}

function validateManifest(manifest, { checkArtifacts }) {
  const findings = []
  const check = (condition, message) => { if (!condition) findings.push(message) }
  const scorePaths = collectForbiddenScorePaths(manifest)
  check(scorePaths.length === 0, `manifest contains forbidden score fields: ${scorePaths.join(', ')}`)

  check(manifest?.acceptanceContract?.path === contractPath, 'manifest acceptance path mismatch')
  check(manifest?.acceptanceContract?.schemaVersion === contract.schemaVersion, 'manifest acceptance schema mismatch')
  check(manifest?.acceptanceContract?.scenes === contract.scenes.length, 'manifest scene count mismatch')
  check(manifest?.acceptanceContract?.views === contract.views.length, 'manifest view count mismatch')
  check(manifest?.acceptanceContract?.flows === contract.flows.length, 'manifest flow count mismatch')
  check(manifest?.acceptanceContract?.target === contract.targets.currentGoalFinal, 'manifest target ladder mismatch')

  const freshness = manifest?.freshness ?? {}
  const freshnessTimes = [freshness.sourceMtime, freshness.buildStartedAt, freshness.buildArtifactMtime, freshness.serverStartedAt, freshness.firstBrowserCheckAt, freshness.evidenceFinishedAt]
  check(freshnessTimes.every(Number.isFinite), 'freshness chain is incomplete')
  check(freshnessTimes.every((value, index) => index === 0 || value >= freshnessTimes[index - 1]), 'freshness chain order is invalid')
  if (checkArtifacts) check(freshness.sourceMtime >= latestMtime(sourceRoots) - 1, 'evidence predates current source, data, asset, or checker')

  const sharedKb = Number(manifest?.build?.sharedKb)
  check(Number.isFinite(sharedKb) && sharedKb <= contract.performanceProtocol.budgets.sharedFirstLoadJsKbMax, 'shared First Load JS is missing or over budget')
  const routeMetrics = manifest?.build?.routes ?? {}
  check(Object.keys(routeMetrics).length === contract.scenes.length, 'build route metrics do not cover seven scenes')
  for (const [route, metric] of Object.entries(routeMetrics)) {
    check(Number(metric.firstLoadKb) - sharedKb <= contract.performanceProtocol.budgets.routeJsGzipIncrementKbMax, `${route} route JS increment exceeds budget`)
  }

  const observations = manifest?.browser?.observations ?? []
  for (const scene of contract.scenes) {
    for (const view of contract.views) {
      const item = observations.find((observation) => observation.scene === scene.id && observation.mode === view.id)
      check(Boolean(item), `${scene.id} missing ${view.id} observation`)
      if (!item) continue
      check(item.route === scene.route, `${scene.id} ${view.id} route mismatch`)
      check(item.sceneRect?.ratio >= 0.7, `${scene.id} ${view.id} scene viewport ratio is too small`)
      check(item.overflowX === false, `${scene.id} ${view.id} has horizontal overflow`)
      check(item.engineeringCopy === false, `${scene.id} ${view.id} exposes engineering copy`)
      check(item.privateCanary === false, `${scene.id} ${view.id} exposes a private canary`)
      check((item.fixedOverlayIssues ?? []).length === 0, `${scene.id} ${view.id} has a blocking fixed overlay`)
      check((item.browserErrors ?? []).length === 0, `${scene.id} ${view.id} has console or page errors`)

      if (view.id === 'javascript-off') {
        check(item.links >= 2 && item.bodyTextLength >= 80, `${scene.id} javascript-off static path is incomplete`)
      } else {
        const rect = item.primarySubjectRect
        check(item.primarySubjectVisibleCount > 0 && rect?.width >= 24 && rect?.height >= 24, `${scene.id} ${view.id} primary subject bounding box is missing`)
        if (rect && item.sceneRect) {
          check(rect.left < item.sceneRect.width && rect.top < item.sceneRect.height && rect.left + rect.width > 0 && rect.top + rect.height > 0, `${scene.id} ${view.id} primary subject is outside the viewport`)
        }
        check(item.interactiveVisible === true, `${scene.id} ${view.id} primary interaction is not visible`)
      }

      const bitmapBytes = resourceBytes(item.resourceEntries, /\.(?:avif|webp|png|jpe?g)(?:\?|$)/i)
      const audioBytes = resourceBytes(item.resourceEntries, /\.(?:mp3|wav|ogg|m4a)(?:\?|$)/i)
      check(bitmapBytes === item.bitmapBytes, `${scene.id} ${view.id} bitmap bytes are not reproducible`)
      check(audioBytes === item.audioBytes, `${scene.id} ${view.id} audio bytes are not reproducible`)
      check(audioBytes === 0 && item.soundMode !== 'playing', `${scene.id} ${view.id} loaded or played audio before consent`)
      if (view.id === 'background-hidden' || view.id === 'resource-failure') check(bitmapBytes <= 64 * 1024, `${scene.id} ${view.id} still depends on a bitmap`)
      if (view.id === 'quiet-static') check(item.quietStaticApplied === true, `${scene.id} quiet-static was not applied`)
      if (view.id === 'resource-failure') check(item.storageAvailable === false, `${scene.id} resource-failure did not disable storage`)
      if (view.id === 'mobile' || view.id === 'reduced-sensory') check(item.sceneRect?.width <= 390, `${scene.id} ${view.id} did not use mobile framing`)

      check(typeof item.screenshot === 'string' && exists(item.screenshot), `${scene.id} ${view.id} screenshot is missing`)
      if (checkArtifacts && exists(item.screenshot)) {
        check(item.screenshotBytes === fs.statSync(path.join(root, item.screenshot)).size, `${scene.id} ${view.id} screenshot size mismatch`)
        check(item.screenshotSha256 === fileHash(item.screenshot), `${scene.id} ${view.id} screenshotSha256 mismatch`)
        check(fs.statSync(path.join(root, item.screenshot)).mtimeMs >= freshness.serverStartedAt, `${scene.id} ${view.id} screenshot predates server`)
      }
    }
  }
  return findings
}

if (selfTest) {
  const findings = validateManifest({ status: 'objective-evidence-captured', score: 9 }, { checkArtifacts: false })
  if (!findings.some((finding) => finding.includes('forbidden score fields')) || findings.length < 10) {
    console.error(`OBJECTIVE_EVIDENCE_SELF_TEST_FAIL findings=${findings.length}`)
    process.exit(1)
  }
  console.log(`OBJECTIVE_EVIDENCE_SELF_TEST_PASS nakedManifestRejected=true findings=${findings.length}`)
  process.exit(0)
}

const failures = []
const control = spawnSync(process.execPath, ['scripts/check-worldos-living-world-control.mjs'], { cwd: root, encoding: 'utf8' })
if (control.status !== 0) failures.push(`living-world control failed: ${control.stderr || control.stdout}`)

for (const scene of contract.scenes) {
  const routeFile = routeFiles[scene.id]
  if (!routeFile || !exists(routeFile)) failures.push(`missing route source for ${scene.id}: ${routeFile ?? 'unmapped'}`)
}

for (const absolutePath of collectActivePublicSources()) {
  const relativePath = path.relative(root, absolutePath)
  const lines = fs.readFileSync(absolutePath, 'utf8').split(/\r?\n/)
  lines.forEach((line, index) => {
    forbiddenPublicCopy.forEach((phrase) => {
      if (visibleCopyLine(line, phrase)) failures.push(`${relativePath}:${index + 1} public copy contains ${phrase}`)
    })
  })
}

const permission = spawnSync(process.execPath, ['scripts/check-worldos-permission-boundary.mjs', '--check-only'], { cwd: root, encoding: 'utf8' })
if (permission.status !== 0) failures.push(`permission boundary failed: ${permission.stderr || permission.stdout}`)

if (!exists(pointerPath)) failures.push(`missing evidence pointer: ${pointerPath}`)
else {
  const pointer = readJson(pointerPath)
  if (!exists(pointer.manifest)) failures.push(`evidence manifest path is invalid: ${pointer.manifest}`)
  else {
    const manifest = readJson(pointer.manifest)
    if (manifest.runId !== pointer.runId) failures.push('evidence pointer runId mismatch')
    failures.push(...validateManifest(manifest, { checkArtifacts: true }))
  }
}

if (failures.length) {
  console.error(`WorldOS objective evidence gate failed findings=${failures.length}`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`WorldOS objective evidence gate passed scenes=${contract.scenes.length} views=${contract.views.length} manifestStatusTrusted=false visualScoreGenerated=false`)

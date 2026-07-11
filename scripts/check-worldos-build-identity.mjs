// 用途：回算生产构建 Merkle，并约束 /status 只展示当前生命世界事实。
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const distDirName = process.env.WORLDOS_DIST_DIR || '.next'
const distDir = path.join(root, distDirName)
const failures = []

function hashFile(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')
}

function collectFiles(directory) {
  const files = []
  const visit = (current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const absolutePath = path.join(current, entry.name)
      if (entry.isDirectory()) visit(absolutePath)
      else files.push(absolutePath)
    }
  }
  visit(directory)
  return files
}

for (const file of [
  'src/app/api/status/build-identity/route.ts',
  'src/lib/living-world-status.ts',
  'src/app/status/page.tsx',
  'src/components/status/RealityFirstBaselinePanel.tsx',
]) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`missing status/build identity file: ${file}`)
}

const statusSource = fs.readFileSync(path.join(root, 'src/app/status/page.tsx'), 'utf8')
const baselineSource = fs.readFileSync(path.join(root, 'src/components/status/RealityFirstBaselinePanel.tsx'), 'utf8')
if (/待外部签收|真实域名|线上 smoke|生产状态/.test(statusSource)) failures.push('/status still contains external release narrative')
if (!statusSource.includes('getLivingWorldStatus')) failures.push('/status does not consume server-side living world status')
if (!baselineSource.includes('CINEMATIC_STATIC_WORLD_IN_PROGRESS')) failures.push('baseline panel does not expose the truthful product status')

const identityPath = path.join(distDir, 'worldos-build-identity.json')
if (!fs.existsSync(identityPath)) failures.push(`missing build identity: ${path.relative(root, identityPath)}`)
if (fs.existsSync(identityPath)) {
  const identity = JSON.parse(fs.readFileSync(identityPath, 'utf8'))
  const files = collectFiles(distDir)
    .map((absolutePath) => path.relative(root, absolutePath).split(path.sep).join('/'))
    .filter((relativePath) => relativePath !== `${distDirName}/trace`
      && relativePath !== `${distDirName}/worldos-build-identity.json`
      && !relativePath.startsWith(`${distDirName}/cache/`)
      && !relativePath.startsWith(`${distDirName}/diagnostics/`))
    .map((relativePath) => ({ path: relativePath, sha256: hashFile(path.join(root, relativePath)) }))
    .sort((left, right) => left.path.localeCompare(right.path))
  const rootSha256 = crypto.createHash('sha256').update(JSON.stringify(files)).digest('hex')
  const buildId = fs.readFileSync(path.join(distDir, 'BUILD_ID'), 'utf8').trim()
  if (identity.buildId !== buildId) failures.push('buildId mismatch')
  if (identity.buildRootHash !== rootSha256) failures.push('build Merkle mismatch')
  if (identity.fileCount !== files.length) failures.push('build file count mismatch')
  if (!/^[a-f0-9]{40}$/.test(identity.sourceCommit ?? '')) failures.push('source commit is invalid')
}

if (failures.length) {
  console.error(`WORLDOS_BUILD_IDENTITY_FAIL findings=${failures.length}`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`WORLDOS_BUILD_IDENTITY_PASS dist=${distDirName}`)

// 用途：verify artifacts
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const requiredArtifacts = [
  '.next/BUILD_ID',
  '.next/build-manifest.json',
  '.next/server/app-paths-manifest.json',
  '.next/routes-manifest.json',
  '.next/required-server-files.json',
]
const freshnessRoots = ['src', 'data', 'content', 'scripts']
const freshnessFiles = ['package.json', 'package-lock.json', 'next.config.ts', 'tailwind.config.ts', 'tsconfig.json']
const ignoredPathParts = new Set(['node_modules', '.next', 'reports'])
const ignoredPrefixes = [
  path.join(root, 'docs', '90-archive', 'reports'),
]

function shouldIgnore(candidate) {
  if (ignoredPrefixes.some((prefix) => candidate.startsWith(prefix))) return true
  return candidate
    .slice(root.length)
    .split(path.sep)
    .some((part) => ignoredPathParts.has(part))
}

function collectFiles(candidate, files = []) {
  if (!fs.existsSync(candidate) || shouldIgnore(candidate)) return files
  const stat = fs.statSync(candidate)
  if (stat.isDirectory()) {
    for (const entry of fs.readdirSync(candidate)) collectFiles(path.join(candidate, entry), files)
    return files
  }
  if (stat.isFile()) files.push({ file: candidate, mtimeMs: stat.mtimeMs })
  return files
}

const missingArtifacts = requiredArtifacts.filter((artifact) => !fs.existsSync(path.join(root, artifact)))

if (missingArtifacts.length > 0) {
  console.error('Artifact verification failed! Missing artifacts:')
  for (const missing of missingArtifacts) {
    console.error(`- ${missing}`)
  }
  process.exit(1)
}

if (process.env.WORLDOS_SKIP_ARTIFACT_FRESHNESS !== '1') {
  const buildIdPath = path.join(root, '.next/BUILD_ID')
  const buildMtimeMs = fs.statSync(buildIdPath).mtimeMs
  const freshnessInputs = [
    ...freshnessRoots.flatMap((item) => collectFiles(path.join(root, item))),
    ...freshnessFiles.flatMap((item) => collectFiles(path.join(root, item))),
  ]
  const staleInputs = freshnessInputs
    .filter((item) => item.mtimeMs > buildMtimeMs + 1000)
    .sort((a, b) => b.mtimeMs - a.mtimeMs)

  if (staleInputs.length > 0) {
    console.error('Artifact verification failed! Build artifacts are older than source inputs:')
    for (const item of staleInputs.slice(0, 12)) {
      console.error(`- ${path.relative(root, item.file)}`)
    }
    if (staleInputs.length > 12) console.error(`- ...and ${staleInputs.length - 12} more`)
    console.error('Run WORLD_KERNEL_FORCE_REBUILD=1 npm run build:kernel-release before RC smoke.')
    process.exit(1)
  }
}

console.log('Artifact verification passed. All required Next.js build artifacts are present.')

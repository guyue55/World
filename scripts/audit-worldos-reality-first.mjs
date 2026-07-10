import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const contractPath = 'data/domains/experience/reality-first-route-contract.json'
const antiBaselinePath = 'docs/90-archive/reports/worldos-reality-first/baseline-2026-07-10/manifest.json'
const extensions = ['', '.ts', '.tsx', '.js', '.jsx', '.mjs', '/index.ts', '/index.tsx']
const routeEntries = [
  'src/app/page.tsx',
  'src/app/atlas/page.tsx',
  'src/app/timeline/page.tsx',
  'src/app/archive/page.tsx',
  'src/app/paths/page.tsx',
  'src/app/paths/[id]/page.tsx',
  'src/app/node/[slug]/page.tsx',
  'src/app/ask/page.tsx',
]

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'))
}

function toRelative(absolutePath) {
  return path.relative(root, absolutePath).split(path.sep).join('/')
}

function resolveImport(fromFile, specifier) {
  if (!specifier.startsWith('@/') && !specifier.startsWith('.')) return null
  const base = specifier.startsWith('@/')
    ? path.join(root, 'src', specifier.slice(2))
    : path.resolve(path.dirname(fromFile), specifier)

  for (const extension of extensions) {
    const candidate = `${base}${extension}`
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate
  }
  return null
}

function collectReachableSources(entries) {
  const queue = entries.map((entry) => path.join(root, entry))
  const visited = new Set()
  const importPattern = /(?:import|export)\s+(?:[^'"`]*?\s+from\s+)?['"]([^'"]+)['"]/g

  while (queue.length > 0) {
    const current = queue.shift()
    if (!current || visited.has(current) || !fs.existsSync(current)) continue
    visited.add(current)
    const source = fs.readFileSync(current, 'utf8')
    for (const match of source.matchAll(importPattern)) {
      const resolved = resolveImport(current, match[1])
      if (resolved && !visited.has(resolved)) queue.push(resolved)
    }
  }
  return [...visited]
}

function isVisibleCopyLine(line, phrase) {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const trimmed = line.trim()
  const jsxTextOnly = line.replace(/\{[^{}]*\}/g, '')
  return (
    new RegExp(`>[^<]*${escaped}[^<]*<`).test(jsxTextOnly) ||
    new RegExp(`^${escaped}(?:[：:]|$)`).test(trimmed) ||
    new RegExp(`["'\`]${escaped}[：:]`).test(line)
  )
}

function latestMtime(relativePaths) {
  let latest = 0
  const visit = (absolutePath) => {
    const stat = fs.statSync(absolutePath)
    if (stat.isDirectory()) {
      for (const child of fs.readdirSync(absolutePath)) visit(path.join(absolutePath, child))
      return
    }
    latest = Math.max(latest, stat.mtimeMs)
  }
  for (const relativePath of relativePaths) visit(path.join(root, relativePath))
  return latest
}

const contract = readJson(contractPath)
const antiBaseline = readJson(antiBaselinePath)
const reachableSources = collectReachableSources(routeEntries)
const missingRouteEntries = routeEntries.filter((entry) => !fs.existsSync(path.join(root, entry)))
const portalImports = []
const publicCopyFindings = []

for (const absolutePath of reachableSources) {
  const relativePath = toRelative(absolutePath)
  const lines = fs.readFileSync(absolutePath, 'utf8').split(/\r?\n/)
  lines.forEach((line, index) => {
    if (/^\s*import\s+.*SceneWorldPortal.*from\s+/.test(line)) portalImports.push({ file: relativePath, line: index + 1 })
    for (const phrase of contract.forbiddenPublicCopy) {
      if (isVisibleCopyLine(line, phrase)) {
        publicCopyFindings.push({ file: relativePath, line: index + 1, phrase })
      }
    }
  })
}

const antiBaselineFiles = antiBaseline.assets.map((asset) => asset.path)
const missingAntiBaselineFiles = antiBaselineFiles.filter((file) => !fs.existsSync(path.join(root, file)))
const latestSourceMtime = latestMtime(['src', 'data/domains/experience', 'package.json'])
const newestOldEvidenceMtime = Math.max(
  ...antiBaselineFiles
    .filter((file) => fs.existsSync(path.join(root, file)))
    .map((file) => fs.statSync(path.join(root, file)).mtimeMs),
  0,
)

const uniquePortalFindings = [...new Map(portalImports.map((item) => [`${item.file}:${item.line}`, item])).values()]
const uniqueCopyFindings = [...new Map(publicCopyFindings.map((item) => [`${item.file}:${item.line}:${item.phrase}`, item])).values()]
const report = {
  generatedAt: new Date().toISOString(),
  status: 'FOUNDATION_ONLY',
  oldSelfScoringInvalidated: true,
  visualAcceptance: 'not-run',
  contract: {
    spaces: contract.spaces.length,
    modes: contract.modes.map((mode) => mode.id),
    requiredFlows: contract.requiredFlows.length,
  },
  findings: {
    missingRouteEntries,
    coreRoutesUsingSceneWorldPortal: uniquePortalFindings.length,
    sceneWorldPortalReferences: uniquePortalFindings,
    publicEngineeringCopyFindings: uniqueCopyFindings.length,
    publicEngineeringCopyReferences: uniqueCopyFindings,
    oldEvidenceStale: newestOldEvidenceMtime < latestSourceMtime,
    missingAntiBaselineFiles,
  },
  interpretation: '此命令只报告可验证事实，不评分、不签收体验，也不因基线缺陷存在而失败。',
}

if (contract.spaces.length !== 7 || contract.modes.length !== 4 || contract.requiredFlows.length !== 9) {
  console.error('Reality-First route contract structure is invalid.')
  process.exit(1)
}
if (missingRouteEntries.length > 0 || missingAntiBaselineFiles.length > 0) {
  console.error(JSON.stringify(report, null, 2))
  process.exit(1)
}

console.log(JSON.stringify(report, null, 2))

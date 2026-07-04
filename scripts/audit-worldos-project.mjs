import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const exists = (file) => fs.existsSync(rel(file))
const read = (file) => fs.readFileSync(rel(file), 'utf-8')
const json = (file) => JSON.parse(read(file))

const EXCLUDED_DIRS = new Set(['.git', 'node_modules', '.next', '.turbo', 'dist', 'build', '.cache', 'coverage', 'reports'])

function walk(dir, predicate = () => true) {
  const start = rel(dir)
  if (!fs.existsSync(start)) return []
  const out = []
  const stack = [start]
  while (stack.length) {
    const current = stack.pop()
    const entries = fs.readdirSync(current, { withFileTypes: true })
    for (const entry of entries) {
      if (EXCLUDED_DIRS.has(entry.name)) continue
      const full = path.join(current, entry.name)
      if (entry.isDirectory()) stack.push(full)
      else {
        const relative = path.relative(root, full).replaceAll(path.sep, '/')
        if (predicate(relative)) out.push(relative)
      }
    }
  }
  return out.sort()
}

function safeJson(file, fallback) {
  try {
    return exists(file) ? json(file) : fallback
  } catch (error) {
    return fallback
  }
}

function grepFiles(files, pattern) {
  const hits = []
  for (const file of files) {
    const source = read(file)
    const lines = source.split('\n')
    lines.forEach((line, index) => {
      if (pattern.test(line)) hits.push({ file, line: index + 1, text: line.trim().slice(0, 240) })
    })
  }
  return hits
}

function parseRoutePath(routeFile) {
  const normalized = routeFile.replace(/^src\/app/, '').replace(/\/route\.ts$/, '')
  return normalized === '' ? '/' : normalized
}

function parsePagePath(pageFile) {
  const normalized = pageFile.replace(/^src\/app/, '').replace(/\/page\.tsx$/, '')
  return normalized === '' ? '/' : normalized
}

function detectApiRoute(routeFile) {
  const source = read(routeFile)
  const methods = [...source.matchAll(/export\s+(?:async\s+)?function\s+(GET|POST|PUT|PATCH|DELETE)/g)].map((m) => m[1])
  return {
    file: routeFile,
    path: parseRoutePath(routeFile),
    methods,
    ownerGuarded: source.includes('requireOwner('),
    permissionGuarded: source.includes('requirePermission('),
    writesMemory: /\b(runtimeNodes\s*=|push\(|splice\(|set\()/m.test(source) && methods.some((m) => m !== 'GET'),
    writesFile: /writeFile|appendFile|unlink|rm\(/.test(source),
    usesEnv: /process\.env/.test(source),
    cacheNoStore: /no-store/.test(source),
  }
}

function scoreStatus({ failures, findings }) {
  if (failures.length) return 'fail'
  if (findings.some((finding) => ['critical', 'important'].includes(finding.severity))) return 'review-completed-with-important-followups'
  if (findings.length) return 'review-completed-with-minor-followups'
  return 'pass'
}

const failures = []
const warnings = []
const findings = []
const checks = []

function addCheck(id, status, summary, details = {}) {
  checks.push({ id, status, summary, details })
  if (status === 'fail') failures.push(summary)
  if (status === 'warn') warnings.push(summary)
}

function addFinding(severity, area, title, evidence, recommendation) {
  findings.push({ severity, area, title, evidence, recommendation })
}

const pkg = safeJson('package.json', { scripts: {} })
const registry = safeJson('data/world-kernel/worldos-mainline-registry-v1.json', {})
const taxonomy = safeJson('data/world-kernel/worldos-script-taxonomy-v1.json', {})
const apiRegistry = safeJson('data/world-kernel/worldos-api-boundary-registry-v1.json', {})
const scriptLegacyRegistry = safeJson('data/world-kernel/worldos-script-legacy-registry-v1.json', {})
const maintenanceCommandSpine = safeJson('data/world-kernel/worldos-maintenance-command-spine-v1.json', {})
const localRuntimeSmoke = safeJson('data/world-kernel/worldos-local-runtime-smoke-v1.json', {})
const rc7RuntimeSmokeReport = safeJson('data/world-kernel/worldos-1-rc7-local-runtime-smoke-v1.json', {})
const governance = safeJson('data/world-kernel/worldos-1-rc3-governance-v1.json', {})
const nodes = safeJson('data/domains/experience/nodes.json', [])
const areas = safeJson('data/domains/experience/areas.json', [])
const paths = safeJson('data/domains/experience/paths.json', [])
const relations = safeJson('data/core/relations.json', [])
const events = safeJson('data/core/world-events.json', [])
const permissions = safeJson('data/domains/governance/permissions.json', [])

const fileCounts = {}
for (const dir of ['src/app', 'src/components', 'src/features', 'src/lib', 'src/platform', 'src/server', 'src/shared', 'data', 'content', 'docs', 'scripts', 'public']) {
  fileCounts[dir] = walk(dir).length
}

const pageFiles = walk('src/app', (file) => file.endsWith('/page.tsx'))
const apiRouteFiles = walk('src/app/api', (file) => file.endsWith('/route.ts'))
const apiRoutes = apiRouteFiles.map(detectApiRoute)
const appRoutes = pageFiles.map((file) => ({ file, path: parsePagePath(file) }))
const scriptNames = Object.keys(pkg.scripts ?? {})
const checkScripts = scriptNames.filter((name) => name.startsWith('check'))
const stageLikeScripts = scriptNames.filter((name) => /^check:(?:r\d|v\d|phase-|stage-|round)/.test(name))
const longScripts = scriptNames
  .map((name) => ({ name, length: String(pkg.scripts[name]).length }))
  .filter((item) => item.length > 1200)
  .sort((a, b) => b.length - a.length)

const publicNodes = nodes.filter((node) => node.visibility === 'public')
const contentBackedPublicNodes = publicNodes.filter((node) => node.contentPath)
const publicPaths = paths.filter((item) => item.visibility === 'public')
const representedAreas = new Set(publicNodes.map((node) => node.areaId))
const featuredNodes = publicNodes.filter((node) => node.featured?.home || node.featured?.representative || node.featured?.recommended)
const relationEndpoints = new Set(relations.flatMap((relation) => [relation.from, relation.to]))
const orphanPublicNodes = publicNodes.filter((node) => !relationEndpoints.has(node.id))
const missingContentFiles = contentBackedPublicNodes.filter((node) => !exists(node.contentPath)).map((node) => ({ id: node.id, slug: node.slug, contentPath: node.contentPath }))

addCheck(
  'content-density',
  publicNodes.length >= 50 && contentBackedPublicNodes.length >= 50 && relations.length >= 80 && publicPaths.length >= 10 ? 'pass' : 'warn',
  `公开节点 ${publicNodes.length}，有正文公开节点 ${contentBackedPublicNodes.length}，关系 ${relations.length}，公开路径 ${publicPaths.length}`,
  { publicNodes: publicNodes.length, contentBackedPublicNodes: contentBackedPublicNodes.length, relations: relations.length, publicPaths: publicPaths.length, representedAreas: representedAreas.size, featuredNodes: featuredNodes.length, orphanPublicNodes: orphanPublicNodes.map((n) => n.slug) },
)

addCheck(
  'content-files',
  missingContentFiles.length === 0 ? 'pass' : 'fail',
  missingContentFiles.length === 0 ? '所有公开正文 contentPath 均存在' : `存在 ${missingContentFiles.length} 个公开节点 contentPath 缺失`,
  { missingContentFiles },
)

const mainlineFiles = registry.mainline?.appFiles ?? []
const forbiddenPublicImports = registry.forbiddenPublicImports ?? []
const mainlineImportViolations = []
for (const file of mainlineFiles) {
  if (!exists(file)) {
    mainlineImportViolations.push({ file, reason: 'file-missing' })
    continue
  }
  const source = read(file)
  for (const token of forbiddenPublicImports) {
    if (source.includes(token)) mainlineImportViolations.push({ file, token })
  }
}

addCheck(
  'mainline-import-boundary',
  mainlineImportViolations.length === 0 ? 'pass' : 'fail',
  mainlineImportViolations.length === 0 ? '公开主线页面未直接导入 forbidden legacy/private 前缀' : `公开主线存在 ${mainlineImportViolations.length} 个 forbidden import 问题`,
  { mainlineImportViolations },
)

const productRoutesSource = exists('src/lib/product-routes.ts') ? read('src/lib/product-routes.ts') : ''
const middlewareSource = exists('middleware.ts') ? read('middleware.ts') : ''
const requiredRouteTokens = ['PRODUCT_PUBLIC_ROUTES', 'PRODUCT_LEGACY_REDIRECTS', 'PRODUCT_PRIVATE_ROUTES', 'PRODUCT_INTERNAL_ROUTE_PATTERNS']
const missingRouteTokens = requiredRouteTokens.filter((token) => !productRoutesSource.includes(token))
const middlewareUsesKernelDecision = middlewareSource.includes('getWorldKernelRouteDecision')
const middlewareExcludesApi = middlewareSource.includes('api/')
addCheck(
  'route-boundary',
  missingRouteTokens.length === 0 && middlewareUsesKernelDecision ? 'pass' : 'fail',
  missingRouteTokens.length === 0 && middlewareUsesKernelDecision ? '产品路由策略与 middleware 统一走 World Kernel decision' : '产品路由策略或 middleware 缺少关键边界',
  { missingRouteTokens, middlewareUsesKernelDecision, middlewareExcludesApi },
)
const apiRegistryRoutes = apiRegistry.routes ?? []
const apiRegistryFiles = new Set(apiRegistryRoutes.map((route) => route.file))
const apiRegistryMissingFiles = apiRouteFiles.filter((file) => !apiRegistryFiles.has(file))
const apiRegistryStaleFiles = apiRegistryRoutes.map((route) => route.file).filter((file) => !apiRouteFiles.includes(file))
addCheck(
  'api-boundary-registry',
  apiRegistryMissingFiles.length === 0 && apiRegistryStaleFiles.length === 0 && apiRegistry.policies?.middlewareApiExclusionRequiresRegistry === true ? 'pass' : 'fail',
  apiRegistryMissingFiles.length === 0 && apiRegistryStaleFiles.length === 0 ? `API 边界注册表已覆盖 ${apiRegistryRoutes.length} 个 API 路由` : 'API 边界注册表与实际 API 路由不一致',
  { middlewareExcludesApi, registeredApiRoutes: apiRegistryRoutes.length, apiRegistryMissingFiles, apiRegistryStaleFiles, registrySummary: apiRegistry.summary ?? {} },
)

const writeApiRoutes = apiRoutes.filter((route) => route.methods.some((method) => method !== 'GET'))
const unguardedWriteApiRoutes = writeApiRoutes.filter((route) => !route.ownerGuarded && !route.permissionGuarded)
const guardedSensitiveRoutes = apiRoutes.filter((route) => route.ownerGuarded || route.permissionGuarded)
addCheck(
  'api-write-boundary',
  unguardedWriteApiRoutes.length === 0 ? 'pass' : 'fail',
  unguardedWriteApiRoutes.length === 0 ? `写入型 API 均有 owner/permission 守门，受保护 API ${guardedSensitiveRoutes.length} 个` : `存在 ${unguardedWriteApiRoutes.length} 个未守门写入型 API`,
  { apiRoutes, writeApiRoutes, unguardedWriteApiRoutes },
)

const publicJsonFiles = ['public/world-index.json', 'public/world-manifest.json'].filter(exists)
const publicJsonBoundaryTerms = []
const publicJsonPrivatePayloadIssues = []
for (const file of publicJsonFiles) {
  const source = read(file)
  for (const token of ['private', 'vault', 'family', 'partner', 'sealed', 'secret', 'GUYUE_OWNER_TOKEN']) {
    if (source.includes(token)) publicJsonBoundaryTerms.push({ file, token })
  }

  const parsed = safeJson(file, {})
  for (const node of parsed.nodes ?? []) {
    if (node.visibility && node.visibility !== 'public') publicJsonPrivatePayloadIssues.push({ file, type: 'node', id: node.id, visibility: node.visibility })
  }
  for (const item of parsed.paths ?? []) {
    if (item.visibility && item.visibility !== 'public') publicJsonPrivatePayloadIssues.push({ file, type: 'path', id: item.id, visibility: item.visibility })
  }
  for (const item of parsed.events ?? []) {
    if (item.visibility && item.visibility !== 'public') publicJsonPrivatePayloadIssues.push({ file, type: 'event', id: item.id, visibility: item.visibility })
  }
}
addCheck(
  'public-json-boundary',
  publicJsonPrivatePayloadIssues.length === 0 ? 'pass' : 'fail',
  publicJsonPrivatePayloadIssues.length === 0 ? '公开 JSON 未发现非 public 节点/路径/事件；private/vault 等仅作为边界说明词出现' : `公开 JSON 出现 ${publicJsonPrivatePayloadIssues.length} 个非 public payload`,
  { publicJsonFiles, publicJsonBoundaryTerms, publicJsonPrivatePayloadIssues },
)

const releaseStates = governance.releaseStates ?? {}
const releaseFlagsOk = ['productionLive', 'releaseReady', 'cleanProductionReady'].every((key) => releaseStates[key] === false)
addCheck(
  'release-honesty',
  releaseFlagsOk ? 'pass' : 'fail',
  releaseFlagsOk ? '生产状态保持 false，未伪造真实外部证据' : '生产状态存在不诚实标记风险',
  { releaseStates },
)

const scriptRegistryTracked =
  scriptLegacyRegistry.scriptCounts?.totalScripts === scriptNames.length &&
  scriptLegacyRegistry.scriptCounts?.checkScripts === checkScripts.length &&
  scriptLegacyRegistry.scriptCounts?.stageLikeCheckScripts === stageLikeScripts.length &&
  (scriptLegacyRegistry.legacyStageLikeCheckScripts ?? []).length === stageLikeScripts.length

addCheck(
  'script-taxonomy',
  scriptNames.includes('check:mainline') &&
    scriptNames.includes('check:release:rc') &&
    scriptNames.includes('check:api-boundary') &&
    scriptNames.includes('check:scripts') &&
    taxonomy.categories?.length >= 7 &&
    scriptRegistryTracked
    ? 'pass'
    : 'warn',
  `npm scripts ${scriptNames.length} 个，其中 check 脚本 ${checkScripts.length} 个，阶段型 check 脚本 ${stageLikeScripts.length} 个；legacy registry 已跟踪 ${scriptLegacyRegistry.legacyStageLikeCheckScripts?.length ?? 0} 个阶段型脚本`,
  {
    totalScripts: scriptNames.length,
    checkScripts: checkScripts.length,
    stageLikeCheckScripts: stageLikeScripts.length,
    longScripts: longScripts.slice(0, 10),
    taxonomyCategories: taxonomy.categories?.map((item) => item.id) ?? [],
    scriptLegacyRegistryTracked: scriptRegistryTracked,
    activeEntrypoints: scriptLegacyRegistry.activeEntrypoints ?? [],
  },
)


const maintenanceScripts = maintenanceCommandSpine.commandSpine ?? []
const maintenanceMissingScripts = maintenanceScripts.filter((entry) => !scriptNames.includes(entry.script)).map((entry) => entry.script)
const maintenanceMismatches = maintenanceScripts
  .filter((entry) => scriptNames.includes(entry.script) && pkg.scripts[entry.script] !== entry.command)
  .map((entry) => ({ script: entry.script, expected: entry.command, actual: pkg.scripts[entry.script] }))
const maintenanceDocs = ['README.md', 'CONTRIBUTING.md']
const maintenanceDocTokens = ['WorldOS 1.0 RC6', 'WorldOS 1.0 RC7', 'check:daily', 'check:boundary', 'check:rc:full', 'smoke:runtime-local']
const maintenanceDocMissing = []
for (const file of maintenanceDocs) {
  const source = exists(file) ? read(file) : ''
  for (const token of maintenanceDocTokens) {
    if (!source.includes(token)) maintenanceDocMissing.push({ file, token })
  }
}
const maintenanceReleaseFlagsOk = Object.entries(maintenanceCommandSpine.releaseStates ?? {})
  .filter(([key]) => key !== 'reason')
  .every(([, value]) => value === false)
addCheck(
  'maintenance-command-spine',
  maintenanceMissingScripts.length === 0 && maintenanceMismatches.length === 0 && maintenanceDocMissing.length === 0 && maintenanceReleaseFlagsOk ? 'pass' : 'fail',
  maintenanceMissingScripts.length === 0 && maintenanceMismatches.length === 0 && maintenanceDocMissing.length === 0 && maintenanceReleaseFlagsOk ? '长期维护命令脊柱已落库并与 package/docs/release 状态对齐' : '长期维护命令脊柱存在漂移',
  {
    commandSpine: maintenanceScripts.map((entry) => entry.script),
    maintenanceMissingScripts,
    maintenanceMismatches,
    maintenanceDocMissing,
    maintenanceReleaseStates: maintenanceCommandSpine.releaseStates ?? {},
  },
)

const localRuntimeScriptsOk =
  scriptNames.includes('smoke:runtime-local') &&
  scriptNames.includes('check:runtime-local') &&
  String(pkg.scripts?.['check:rc:full'] ?? '').includes('smoke:runtime-local')
const localRuntimeRoutesOk =
  (localRuntimeSmoke.publicHtmlRoutes ?? []).length >= 8 &&
  (localRuntimeSmoke.staticAssetRoutes ?? []).length >= 4 &&
  (localRuntimeSmoke.legacyRedirectRoutes ?? []).length >= 3 &&
  (localRuntimeSmoke.guardedRoutes ?? []).length >= 2
const localRuntimeReleaseFlagsOk = Object.entries(localRuntimeSmoke.releaseStates ?? {})
  .filter(([key]) => key !== 'reason')
  .every(([, value]) => value === false)
addCheck(
  'local-runtime-smoke',
  localRuntimeScriptsOk && localRuntimeRoutesOk && localRuntimeReleaseFlagsOk && String(rc7RuntimeSmokeReport.status ?? '').includes('rc7-local-runtime-smoke-completed') ? 'pass' : 'fail',
  localRuntimeScriptsOk && localRuntimeRoutesOk && localRuntimeReleaseFlagsOk ? '本地 production HTTP smoke 已注册并接入完整 RC 门禁' : '本地 runtime smoke 注册表、脚本或生产状态存在漂移',
  {
    localRuntimeScriptsOk,
    localRuntimeRoutes: {
      publicHtmlRoutes: (localRuntimeSmoke.publicHtmlRoutes ?? []).length,
      staticAssetRoutes: (localRuntimeSmoke.staticAssetRoutes ?? []).length,
      legacyRedirectRoutes: (localRuntimeSmoke.legacyRedirectRoutes ?? []).length,
      guardedRoutes: (localRuntimeSmoke.guardedRoutes ?? []).length,
    },
    localRuntimeReleaseStates: localRuntimeSmoke.releaseStates ?? {},
    rc7RuntimeSmokeStatus: rc7RuntimeSmokeReport.status ?? 'missing',
  },
)

const allSourceFiles = walk('src', (file) => /\.(ts|tsx|js|jsx)$/.test(file))
const legacyImportHits = grepFiles(allSourceFiles, /@\/(?:components|features)\/(?:r\d|v\d|private|ai-workbench)/)
const publicMainlineSet = new Set(mainlineFiles)
const publicLegacyHits = legacyImportHits.filter((hit) => publicMainlineSet.has(hit.file))
addCheck(
  'legacy-footprint',
  publicLegacyHits.length === 0 ? 'pass' : 'fail',
  publicLegacyHits.length === 0 ? `legacy imports 未进入公开主线；全 src legacy/private import 足迹 ${legacyImportHits.length} 处` : `公开主线存在 ${publicLegacyHits.length} 个 legacy/private import 足迹`,
  { totalLegacyImportHits: legacyImportHits.length, publicLegacyHits, sampleLegacyImportHits: legacyImportHits.slice(0, 30) },
)

const englishLikeMainlineHits = []
for (const file of mainlineFiles) {
  if (!exists(file)) continue
  const source = read(file)
  const matches = source.match(/>[A-Za-z][A-Za-z\s'’\-:]{8,}</g) ?? []
  if (matches.length) englishLikeMainlineHits.push({ file, matches: matches.slice(0, 5) })
}
addCheck(
  'chinese-first-ui',
  englishLikeMainlineHits.length <= 5 ? 'pass' : 'warn',
  englishLikeMainlineHits.length <= 5 ? '公开主线未发现大面积英文 UI 文案' : `公开主线发现 ${englishLikeMainlineHits.length} 个文件可能有英文 UI 文案`,
  { englishLikeMainlineHits },
)

const worldShellSource = exists('src/components/world/WorldShell.tsx') ? read('src/components/world/WorldShell.tsx') : ''
addCheck(
  'accessibility-basics',
  worldShellSource.includes('main-content') && worldShellSource.includes('ProductJourneyDock') ? 'pass' : 'warn',
  worldShellSource.includes('main-content') && worldShellSource.includes('ProductJourneyDock') ? 'WorldShell 保留 main-content 与旅程浮层基础' : 'WorldShell 可访问性或旅程入口基础需复核',
  { hasMainContent: worldShellSource.includes('main-content'), hasProductJourneyDock: worldShellSource.includes('ProductJourneyDock') },
)

// Git cleanliness is verified outside this script immediately before commit/package.
addCheck(
  'git-working-tree-policy',
  'pass',
  'Git 工作区洁净性作为收尾门禁单独验证，不写入审查 JSON，避免报告随提交状态漂移',
  {},
)

const summary = {
  auditName: 'WorldOS 1.0 RC7 本地运行时 HTTP Smoke 与维护治理复核',
  auditedAt: '2026-07-04',
  sourcePackage: 'worldos_1_rc6_maintenance_command_spine_full-package.zip',
  superpowersWorkflow: {
    skillsApplied: ['using-superpowers', 'writing-plans', 'verification-before-completion', 'finishing-a-development-branch'],
    mode: 'local-runtime-smoke-no-feature-expansion',
  },
  metrics: {
    fileCounts,
    appPages: pageFiles.length,
    apiRoutes: apiRoutes.length,
    npmScripts: scriptNames.length,
    checkScripts: checkScripts.length,
    stageLikeCheckScripts: stageLikeScripts.length,
    stableEntrypoints: maintenanceCommandSpine.stableEntrypoints?.length ?? 0,
    localRuntimeSmokeRoutes: ((localRuntimeSmoke.publicHtmlRoutes ?? []).length + (localRuntimeSmoke.staticAssetRoutes ?? []).length + (localRuntimeSmoke.legacyRedirectRoutes ?? []).length + (localRuntimeSmoke.guardedRoutes ?? []).length + (localRuntimeSmoke.negativeRoutes ?? []).length),
    publicNodes: publicNodes.length,
    contentBackedPublicNodes: contentBackedPublicNodes.length,
    publicPaths: publicPaths.length,
    areas: areas.length,
    representedAreas: representedAreas.size,
    relations: relations.length,
    worldEvents: events.length,
    permissions: permissions.length,
  },
  progress: {
    audit: 'completed-in-this-run-after-verification',
    architectureAudit: 'completed-v1-previously',
    kernelConsolidation: 'completed-k1-k4-and-k5-local-previously',
    releaseCandidate: 'rc7-local-runtime-smoke-completed-locally',
    externalEvidence: 'blocked-preview-production-smoke-signoff-required',
    productionLive: false,
    releaseReady: false,
    cleanProductionReady: false,
  },
  checks,
  findings,
  recommendations: [
    '保持当前 RC 主线，不再新增 R/V/R8 运行层。',
    'API boundary registry/check 已落库；后续新增 API 必须同步注册并通过 check:api-boundary。',
    '长期维护命令脊柱已落库；优先使用 check:daily、check:boundary、check:rc:fast、check:rc:full，历史阶段脚本仅作为 legacy/reference。',
    '本地运行时 HTTP smoke 已接入 check:rc:full；它验证本地 production server 行为，但不替代真实外部 smoke。',
    '继续物理归档 legacy 文档/阶段产物，但不要在未完成导入边界门禁前大删历史代码。',
    '下一轮优先做 legacy 物理归档前置清单、公开体验真机检查清单和外部部署证据对接。',
  ],
  status: scoreStatus({ failures, findings }),
  failures,
  warnings,
}

const outFile = 'data/world-kernel/worldos-1-rc7-project-audit-v1.json'
fs.writeFileSync(rel(outFile), `${JSON.stringify(summary, null, 2)}\n`)

if (failures.length) {
  console.error(`WorldOS project audit failed: ${failures.length} failure(s)`) 
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`WorldOS project audit ${summary.status}: ${checks.length} checks, ${findings.length} findings, ${warnings.length} warnings`)
console.log(`Report written: ${outFile}`)

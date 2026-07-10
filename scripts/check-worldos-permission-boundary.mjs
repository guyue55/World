// 用途：检查worldos permission boundary
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const read = (file) => fs.readFileSync(rel(file), 'utf-8')
const readJson = (file) => JSON.parse(read(file))
const failures = []

const contractPath = 'data/world-kernel/worldos-permission-boundary-contract-v1.json'
const contract = readJson(contractPath)
const packageJson = readJson('package.json')
const permissions = readJson('data/domains/governance/permissions.json')
const publicIndex = fs.existsSync(rel('public/world-index.json')) ? readJson('public/world-index.json') : null
const forbiddenVisibilities = new Set(['private', 'family', 'partner', 'vault', 'sealed', 'silent'])
const expectedVisibilities = ['public', 'unlisted', 'semiPublic', 'private', 'family', 'partner', 'vault', 'sealed', 'silent']
const reportPath = 'docs/90-archive/reports/worldos-m27-layered-permission-report.json'

function requireFile(file) {
  if (!fs.existsSync(rel(file))) failures.push(`缺少文件：${file}`)
}

function source(file) {
  requireFile(file)
  return fs.existsSync(rel(file)) ? read(file) : ''
}

for (const file of [
  contractPath,
  'src/lib/permissions.ts',
  'src/lib/visibility.ts',
  'src/lib/owner-auth.ts',
  'src/lib/product-routes.ts',
  'src/lib/world-kernel-boundary.ts',
  'middleware.ts',
  'data/domains/governance/permissions.json',
  'data/world-kernel/worldos-api-boundary-registry-v1.json',
]) {
  requireFile(file)
}

for (const artifact of contract.publicJsonArtifacts ?? []) requireFile(artifact)

if (contract.source !== 'docs/00-overview/worldos-m27-layered-permission-private-universe-spec-2026-07-10.md') failures.push('权限边界契约必须指向 M27 规范')

for (const key of ['frontendVisibilityIsNotPermission', 'publicPagesUsePublicSourcesOnly', 'middlewareExcludesApiRoutes', 'apiRoutesMustUseOwnGuards', 'ownerTokenMustBeServerConfigured', 'unlistedMustNotEnterPublicIndex', 'aiReadsPublicOnlyByDefault']) {
  if (contract.policies?.[key] !== true) failures.push(`权限边界契约缺少策略：${key}`)
}

for (const key of ['productionLive', 'releaseReady', 'cleanProductionReady']) {
  if (contract.releaseStates?.[key] !== false) failures.push(`${key} 在权限边界阶段必须保持 false`)
}

const permissionByVisibility = new Map(permissions.map((item) => [item.visibility, item]))
for (const visibility of expectedVisibilities) {
  const record = permissionByVisibility.get(visibility)
  if (!record) {
    failures.push(`权限矩阵缺少 visibility：${visibility}`)
    continue
  }

  if (forbiddenVisibilities.has(visibility)) {
    if (record.searchable !== false) failures.push(`${visibility} 不允许公开搜索`)
    if (record.recommendable !== false) failures.push(`${visibility} 不允许公开推荐`)
    if (record.aiIndexable !== false) failures.push(`${visibility} 不允许公开 AI 索引`)
    if (record.buildTarget === 'public') failures.push(`${visibility} 不允许进入 public build`)
  }

  if (visibility === 'unlisted') {
    if (record.searchable !== false) failures.push('unlisted 不允许公开搜索')
    if (record.recommendable !== false) failures.push('unlisted 不允许公开推荐')
    if (record.aiIndexable !== false) failures.push('unlisted 不允许公开 AI 索引')
    if (record.buildTarget !== 'public') failures.push('unlisted 应允许直接入口 public build，但不能进入公开索引')
  }
}

const visibilitySource = source('src/lib/visibility.ts')
for (const visibility of ['unlisted', 'private', 'family', 'partner', 'vault', 'sealed', 'silent']) {
  if (!visibilitySource.includes(`'${visibility}'`)) failures.push(`visibility helper 未排除 ${visibility}`)
}
if (!visibilitySource.includes('mustExcludeFromPublicBuild')) failures.push('visibility helper 必须提供 mustExcludeFromPublicBuild')
if (!visibilitySource.includes('isUnlistedVisibility')) failures.push('visibility helper 必须提供 isUnlistedVisibility')

const ownerAuthSource = source('src/lib/owner-auth.ts')
for (const token of ['GUYUE_OWNER_TOKEN', 'R8_OWNER_TOKEN', 'authorization', 'x-guyue-owner-token', 'NextResponse.json']) {
  if (!ownerAuthSource.includes(token)) failures.push(`owner-auth 缺少服务端 token 行为：${token}`)
}
if (ownerAuthSource.includes('return true')) failures.push('owner-auth 不允许无条件放行')
if (!ownerAuthSource.includes('status: 403')) failures.push('owner-auth 拒绝响应必须是 403')

const routePolicySource = source('src/lib/product-routes.ts')
for (const route of contract.requiredPrivateRoutes ?? []) {
  if (!routePolicySource.includes(`'${route}'`)) failures.push(`PRODUCT_PRIVATE_ROUTES 缺少：${route}`)
}

const boundarySource = source('src/lib/world-kernel-boundary.ts')
for (const token of ['private-guarded', 'internal-guarded', "target: '/forbidden'", '前端隐藏']) {
  if (!boundarySource.includes(token)) failures.push(`world-kernel-boundary 缺少边界证据：${token}`)
}

const middlewareSource = source('middleware.ts')
for (const token of ['getWorldKernelRouteDecision', 'private-guarded', 'internal-guarded', 'api/']) {
  if (!middlewareSource.includes(token)) failures.push(`middleware 缺少边界行为：${token}`)
}

for (const file of contract.publicPageFiles ?? []) {
  const content = source(file)
  for (const forbiddenImport of contract.forbiddenPublicImports ?? []) {
    if (content.includes(forbiddenImport)) failures.push(`公开页面 ${file} 不能导入 ${forbiddenImport}`)
  }
  if (content.includes('localStorage') && /permission|visibility|owner|auth/i.test(content)) {
    failures.push(`公开页面 ${file} 不允许用 localStorage 作为权限事实源`)
  }
}

const forbiddenPage = source('src/app/forbidden/page.tsx')
for (const token of ['公开世界不是完整世界', '服务端路由拦截', '返回外庭', '查看公开内容', '询问灯塔']) {
  if (!forbiddenPage.includes(token)) failures.push(`forbidden 页面缺少统一降级文案：${token}`)
}

if (publicIndex) {
  for (const node of publicIndex.nodes ?? []) {
    if (forbiddenVisibilities.has(node.visibility)) failures.push(`public/world-index.json 泄漏非公开节点：${node.id}`)
    if (node.visibility === 'unlisted') failures.push(`public/world-index.json 不应收录 unlisted 节点：${node.id}`)
  }
  for (const event of publicIndex.events ?? []) {
    if (event.visibility && forbiddenVisibilities.has(event.visibility)) failures.push(`public/world-index.json 泄漏非公开事件：${event.id}`)
    if (event.visibility === 'unlisted') failures.push(`public/world-index.json 不应收录 unlisted 事件：${event.id}`)
  }
  for (const area of publicIndex.areas ?? []) {
    if ('defaultVisibility' in area) failures.push(`public/world-index.json 不应暴露区域 defaultVisibility：${area.id}`)
  }
}

if (!packageJson.scripts?.['check:api-boundary']?.includes('check-worldos-api-boundary')) failures.push('缺少 check:api-boundary')
if (packageJson.scripts?.['check:m27-layered-permission'] !== 'node scripts/check-worldos-permission-boundary.mjs') failures.push('缺少 check:m27-layered-permission')
if (!packageJson.scripts?.['check:mainline']?.includes('check:m27-layered-permission')) failures.push('check:mainline 必须纳入 check:m27-layered-permission')
if (!packageJson.scripts?.['check:public']?.includes('check-public-build')) failures.push('缺少 check:public')
if (!packageJson.scripts?.['check:boundary']?.includes('check:permission-boundary')) failures.push('check:boundary 必须纳入 check:permission-boundary')

const scriptRegistry = readJson('data/world-kernel/worldos-script-legacy-registry-v1.json')
if (!(scriptRegistry.activeEntrypoints ?? []).includes('check:m27-layered-permission')) failures.push('脚本注册表缺少 check:m27-layered-permission active entrypoint')
if (!(scriptRegistry.recommendedDailyCommands ?? []).includes('npm run check:m27-layered-permission')) failures.push('脚本注册表缺少 check:m27-layered-permission daily command')
if (!(scriptRegistry.releaseCandidateCommands ?? []).includes('npm run check:m27-layered-permission')) failures.push('脚本注册表缺少 check:m27-layered-permission RC command')

const report = {
  generatedAt: new Date().toISOString(),
  status: failures.length ? 'failed' : 'passed',
  stage: 'M27',
  contract: contractPath,
  source: contract.source,
  expectedVisibilities,
  forbiddenVisibilities: [...forbiddenVisibilities],
  unlisted: permissionByVisibility.get('unlisted') ?? null,
  publicIndex: publicIndex
    ? {
        nodes: publicIndex.nodes?.length ?? 0,
        events: publicIndex.events?.length ?? 0,
        unlistedNodes: (publicIndex.nodes ?? []).filter((node) => node.visibility === 'unlisted').length,
        forbiddenNodes: (publicIndex.nodes ?? []).filter((node) => forbiddenVisibilities.has(node.visibility)).length,
      }
    : null,
  policies: contract.policies,
  requiredPrivateRoutes: contract.requiredPrivateRoutes,
  failures,
}

fs.mkdirSync(path.dirname(rel(reportPath)), { recursive: true })
fs.writeFileSync(rel(reportPath), `${JSON.stringify(report, null, 2)}\n`, 'utf8')

if (failures.length) {
  console.error('WorldOS permission boundary check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('WorldOS permission boundary check passed')

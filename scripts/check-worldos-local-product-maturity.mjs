import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const failures = []

function rel(file) {
  return path.join(root, file)
}

function read(file) {
  return fs.readFileSync(rel(file), 'utf-8')
}

function readJson(file) {
  return JSON.parse(read(file))
}

function assert(condition, message) {
  if (!condition) failures.push(message)
}

function fileExists(file) {
  return fs.existsSync(rel(file))
}

function isPublicVisible(visibility) {
  return visibility === 'public' || visibility === 'semiPublic'
}

function requireSourceTokens(file, tokens) {
  assert(fileExists(file), `缺少成熟度源文件：${file}`)
  if (!fileExists(file)) return
  const source = read(file)
  for (const token of tokens) {
    assert(source.includes(token), `${file} 缺少成熟度证据：${token}`)
  }
}

function verifyVisitorRoute(route, paths, nodes) {
  if (route.startsWith('/paths/')) {
    const id = route.slice('/paths/'.length)
    const item = paths.find((pathItem) => pathItem.id === id)
    assert(Boolean(item), `访客路径引用不存在路径：${route}`)
    assert(item?.visibility === 'public', `访客路径引用非公开路径：${route}`)
    assert((item?.nodeSlugs ?? []).length > 0, `访客路径没有节点：${route}`)
    return
  }

  if (route.startsWith('/node/')) {
    const slug = route.slice('/node/'.length)
    const item = nodes.find((node) => node.slug === slug)
    assert(Boolean(item), `访客路径引用不存在节点：${route}`)
    assert(item && isPublicVisible(item.visibility), `访客路径引用非公开节点：${route}`)
    return
  }

  const staticPages = new Set(['/', '/atlas', '/timeline', '/archive', '/paths', '/ask', '/status', '/about', '/manifesto'])
  assert(staticPages.has(route), `访客路径引用未注册公开页面：${route}`)
}

function main() {
  const contract = readJson('data/world-kernel/worldos-local-product-maturity-contract-v1.json')
  const pkg = readJson('package.json')
  const commandSpine = readJson('data/world-kernel/worldos-maintenance-command-spine-v1.json')
  const nodes = readJson('data/domains/experience/nodes.json')
  const paths = readJson('data/domains/experience/paths.json')
  const relations = readJson('data/core/relations.json')
  const lanReport = readJson('docs/90-archive/reports/worldos-local-lan-rc-report.json')
  const rcSummary = readJson('docs/90-archive/reports/worldos-local-rc-summary-report.json')

  assert(contract.name === 'WorldOS 本地产品成熟度契约 v1', '本地成熟度契约名称不正确')
  assert(contract.scope?.localOnly === true, '本地成熟度必须声明 localOnly=true')
  assert(contract.scope?.externalPreviewConsidered === false, '本地成熟度阶段不得考虑外部 Preview')
  assert(contract.scope?.productionConsidered === false, '本地成熟度阶段不得考虑 Production')

  for (const [key, value] of Object.entries(contract.releaseStates ?? {})) {
    assert(value === false, `${key} 在本地成熟度阶段必须保持 false`)
  }

  for (const command of contract.requiredCommands ?? []) {
    assert(Boolean(pkg.scripts?.[command]), `package.json 缺少成熟度命令：${command}`)
  }
  assert(pkg.scripts?.['check:local-product-maturity'] === 'node scripts/check-worldos-local-product-maturity.mjs', 'check:local-product-maturity 命令不正确')
  assert(pkg.scripts?.['check:mainline']?.includes('check:local-product-maturity'), 'check:mainline 必须纳入 check:local-product-maturity')
  assert((commandSpine.stableEntrypoints ?? []).includes('check:local-product-maturity'), '命令脊柱 stableEntrypoints 缺少 check:local-product-maturity')

  for (const report of contract.requiredReports ?? []) {
    assert(fileExists(report), `缺少本地成熟度报告：${report}`)
  }

  const publicNodes = nodes.filter((node) => node.visibility === 'public')
  const publicPaths = paths.filter((pathItem) => pathItem.visibility === 'public')
  const publicNodeSlugs = new Set(publicNodes.map((node) => node.slug))
  const relationNodeIds = new Set(relations.flatMap((relation) => [relation.from, relation.to]))
  const minimums = contract.minimums ?? {}

  assert(publicNodes.length >= minimums.publicNodes, `公开节点不足：${publicNodes.length}/${minimums.publicNodes}`)
  assert(publicPaths.length >= minimums.publicPaths, `公开路径不足：${publicPaths.length}/${minimums.publicPaths}`)
  assert(relations.length >= minimums.relations, `关系数量不足：${relations.length}/${minimums.relations}`)

  const firstVisit = publicPaths.find((pathItem) => pathItem.id === 'first-visit')
  assert(Boolean(firstVisit), '缺少新手路径 first-visit')
  assert((firstVisit?.nodeSlugs ?? []).length >= minimums.firstVisitPathNodes, `first-visit 节点不足：${firstVisit?.nodeSlugs?.length ?? 0}/${minimums.firstVisitPathNodes}`)
  for (const slug of firstVisit?.nodeSlugs ?? []) {
    assert(publicNodeSlugs.has(slug), `first-visit 引用了不存在或非公开节点：${slug}`)
  }

  for (const node of publicNodes) {
    assert(Boolean(node.summary && node.summary.length >= 18), `${node.id} 缺少可读摘要`)
    assert(Boolean(node.contentPath && fileExists(node.contentPath)), `${node.id} 缺少可读正文`)
    assert(relationNodeIds.has(node.id), `${node.id} 没有关系星线，成熟本地世界不应出现孤岛节点`)
  }

  for (const pathItem of publicPaths) {
    assert(pathItem.nodeSlugs.length >= 4, `${pathItem.id} 路径节点少于 4 个`)
    for (const slug of pathItem.nodeSlugs) {
      assert(publicNodeSlugs.has(slug), `${pathItem.id} 引用了不存在或非公开节点：${slug}`)
    }
  }

  for (const journey of contract.visitorJourneys ?? []) {
    assert((journey.routes ?? []).length >= 4, `${journey.id} 访客路径过短`)
    for (const route of journey.routes ?? []) verifyVisitorRoute(route, paths, nodes)
  }

  for (const [file, tokens] of Object.entries(contract.requiredSourceTokens ?? {})) {
    requireSourceTokens(file, tokens)
  }

  const surfaceSource = read('src/lib/public-world-surfaces.ts')
  for (const token of ["id: 'path'", "id: 'atlas'", "id: 'archive'", "id: 'ask'"]) {
    assert(surfaceSource.includes(token), `首页入口缺少 ${token}`)
  }
  const homeEntrypointCount = ["id: 'path'", "id: 'atlas'", "id: 'archive'", "id: 'ask'"].filter((token) => surfaceSource.includes(token)).length
  assert(homeEntrypointCount >= minimums.homeEntrypoints, `首页入口不足：${homeEntrypointCount}/${minimums.homeEntrypoints}`)

  assert(lanReport.status === 'passed', 'LAN RC 报告必须通过')
  assert(lanReport.bindHost === '0.0.0.0', 'LAN RC 必须绑定 0.0.0.0')
  assert(String(lanReport.baseUrl ?? '').startsWith('http://'), 'LAN RC 必须使用本地 http URL')
  assert(!String(lanReport.baseUrl ?? '').includes('localhost'), 'LAN RC 必须证明局域网 IP，不只证明 localhost')
  assert((lanReport.checks ?? []).length >= minimums.lanHttpChecks, `LAN HTTP 检查不足：${lanReport.checks?.length ?? 0}/${minimums.lanHttpChecks}`)
  assert((lanReport.browserChecks ?? []).length >= minimums.lanBrowserChecks, `LAN browser 检查不足：${lanReport.browserChecks?.length ?? 0}/${minimums.lanBrowserChecks}`)
  assert((lanReport.checks ?? []).every((item) => item.passed === true), 'LAN HTTP 检查存在失败项')
  assert((lanReport.browserChecks ?? []).every((item) => item.passed === true), 'LAN browser 检查存在失败项')

  const browserRoutes = new Set((lanReport.browserChecks ?? []).map((item) => item.route))
  for (const route of contract.routeEvidence?.coreLanRoutes ?? []) {
    assert(browserRoutes.has(route), `LAN browser 报告缺少核心路由：${route}`)
  }

  const viewports = new Set((lanReport.browserChecks ?? []).map((item) => item.viewport))
  for (const viewport of contract.routeEvidence?.requiredViewportIds ?? []) {
    assert(viewports.has(viewport), `LAN browser 报告缺少视口：${viewport}`)
  }

  const screenshots = (lanReport.browserChecks ?? []).filter((item) => item.screenshotPath)
  assert(screenshots.length >= minimums.lanScreenshots, `LAN 截图不足：${screenshots.length}/${minimums.lanScreenshots}`)
  for (const item of screenshots) {
    assert(fileExists(item.screenshotPath), `LAN 截图文件不存在：${item.screenshotPath}`)
  }

  assert(rcSummary.status === 'local-rc-passed-external-release-blocked', '本地 RC 摘要必须保持外部发布阻断状态')
  assert(rcSummary.localAccess?.mode === 'local-lan', '本地 RC 摘要必须声明 local-lan')
  assert(rcSummary.releaseStates?.productionLive === false, '本地成熟度不能把 productionLive 标为 true')

  if (failures.length) {
    console.error('WorldOS local product maturity check failed:')
    for (const failure of failures) console.error(`- ${failure}`)
    process.exit(1)
  }

  console.log(`WorldOS local product maturity check passed: ${publicNodes.length} public nodes, ${publicPaths.length} paths, ${relations.length} relations, ${lanReport.browserChecks.length} browser checks`)
}

main()

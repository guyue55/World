import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const exists = (file) => fs.existsSync(rel(file))
const readJson = (file) => JSON.parse(fs.readFileSync(rel(file), 'utf-8'))
const readText = (file) => fs.readFileSync(rel(file), 'utf-8')

function walk(dir) {
  if (!exists(dir)) return []
  const out = []
  const stack = [rel(dir)]
  while (stack.length) {
    const current = stack.pop()
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name)
      if (entry.isDirectory()) stack.push(full)
      else out.push(path.relative(root, full).replaceAll(path.sep, '/'))
    }
  }
  return out.sort()
}

function countWhere(files, predicate) {
  return files.filter(predicate).length
}

function groupByTopDirectory(files, prefix) {
  const groups = new Map()
  for (const file of files) {
    const rest = file.slice(prefix.length).replace(/^\//, '')
    const top = rest.split('/')[0] || '(root)'
    groups.set(top, (groups.get(top) ?? 0) + 1)
  }
  return Object.fromEntries([...groups.entries()].sort(([a], [b]) => a.localeCompare(b)))
}

const files = {
  app: walk('src/app'),
  components: walk('src/components'),
  features: walk('src/features'),
  lib: walk('src/lib'),
  data: walk('data'),
  scripts: walk('scripts'),
  docs: walk('docs'),
}

const packageJson = readJson('package.json')
const scripts = packageJson.scripts ?? {}
const scriptNames = Object.keys(scripts)
const productRoutes = readText('src/lib/product-routes.ts')
const freezePolicy = readJson('data/world-kernel/kernel-freeze-policy.json')

const stageRouteFiles = files.app.filter((file) => /src\/app\/(?:v\d|r\d|phase-|evidence|governance|hardening|observability|operator|production|release|service-adapters)/.test(file))
const r8Components = files.components.filter((file) => /src\/components\/r8-/.test(file))
const r8Data = files.data.filter((file) => /data\/r8-/.test(file))
const r8Scripts = files.scripts.filter((file) => /scripts\/check-r8-|scripts\/run-r8-/.test(file))
const checkScripts = scriptNames.filter((name) => name.startsWith('check:'))
const stageCheckScripts = checkScripts.filter((name) => /^(check:)?(?:v\d|r\d|phase-|round|release|evidence)/.test(name.replace('check:', '')) || /^check:(?:v\d|r\d|phase-|round|release|evidence)/.test(name))

const publicRouteMatches = [...productRoutes.matchAll(/'([^']+)'/g)].map((match) => match[1])

const findings = [
  {
    id: 'kernel-001',
    severity: 'critical',
    area: 'Baseline',
    title: '必须停止继续扩展 R/V 阶段线',
    evidence: `src/app 中发现 ${stageRouteFiles.length} 个阶段/治理/生产类路由文件；scripts 中发现 ${stageCheckScripts.length} 个阶段类 check 脚本。`,
    decision: '冻结功能扩张，后续只允许审计、收束、修复和真实发布证据工作。',
    action: 'Keep product routes; archive stage routes behind middleware; do not add R8.10/V11.',
  },
  {
    id: 'kernel-002',
    severity: 'high',
    area: 'Runtime',
    title: 'R8 动态宇宙运行层存在多代重复实现',
    evidence: `发现 ${r8Components.length} 个 r8 组件文件、${r8Data.length} 个 r8 数据文件、${r8Scripts.length} 个 r8 运行/检查脚本。`,
    decision: '保留产品化 WorldShell + Product* 为公开入口；R8 动态系列降级为 legacy/reference。',
    action: 'Merge only validated runtime ideas into a future single World Runtime; do not expose R8 components in product routes.',
  },
  {
    id: 'kernel-003',
    severity: 'high',
    area: 'Routes',
    title: '公开路由应由单一 World Kernel Route Decision 控制',
    evidence: 'middleware 已改为读取 getWorldKernelRouteDecision；product-routes 继续作为 route registry。',
    decision: '服务端路由边界优先于前端显隐，私密和内部路由统一 redirect/guard。',
    action: 'Keep src/lib/world-kernel-boundary.ts as route boundary facade.',
  },
  {
    id: 'kernel-004',
    severity: 'medium',
    area: 'Scripts',
    title: '检查脚本数量已经进入治理期',
    evidence: `package.json 当前声明 ${scriptNames.length} 个 scripts，其中 check:* ${checkScripts.length} 个。`,
    decision: '短期保留历史 checks，新增 check:world-kernel-audit 作为收束门禁；中期合并为 check:core/check:runtime/check:release/check:legacy。',
    action: 'Add audit gate first; avoid breaking historical checks in this round.',
  },
  {
    id: 'kernel-005',
    severity: 'medium',
    area: 'Production',
    title: 'productionLive 仍不能声明为 true',
    evidence: '当前包只能验证本地 product gates 与 build artifacts，缺真实 Preview/Production URL、线上 smoke、人工签收和回滚演练。',
    decision: '所有交付继续标记 productionLive=false，直到真实环境证据补齐。',
    action: 'Next phase should perform preview deployment evidence, not more feature work.',
  },
]

const decisionMatrix = [
  {
    category: 'Core Model',
    keep: ['src/lib/types.ts', 'src/lib/world-core.ts', 'data/domains/experience/*.json'],
    merge: ['分散在 v/r 阶段的 Node/Area/Relation 衍生字段'],
    archive: ['只服务阶段页的 v*/r* data definitions'],
    deleteLater: ['重复且无公开入口引用的旧实验模型'],
  },
  {
    category: 'Runtime',
    keep: ['ProductBackdrop', 'ProductJourneyDock', 'ProductRouteGuide', 'WorldShell'],
    merge: ['R8 Dynamic/Living/Complete/Interactive/Civilization 中被验证有效的交互思路'],
    archive: ['src/components/r8-*', 'data/r8-*', 'scripts/check-r8-*'],
    deleteLater: ['未被页面引用的重复 runtime widgets'],
  },
  {
    category: 'Routes',
    keep: freezePolicy.canonicalPublicRoutes,
    merge: ['world/world-map/time-river/lighthouse legacy redirects'],
    archive: ['v*/r*/phase*/evidence/governance/production/release routes'],
    deleteLater: ['无文档、无导航、无测试覆盖的阶段页'],
  },
  {
    category: 'Scripts',
    keep: ['check:product-release', 'check:world-kernel-audit', 'lint', 'typecheck', 'build:verify-artifacts'],
    merge: ['stage/round/r/v checks into check:legacy'],
    archive: ['历史阶段批次检查脚本'],
    deleteLater: ['重复验证同一文件存在性的阶段脚本'],
  },
]

const audit = {
  auditVersion: '1.0.0',
  generatedAt: new Date().toISOString(),
  baseline: freezePolicy.baseline,
  freezeStatus: freezePolicy.status,
  statistics: {
    files: Object.fromEntries(Object.entries(files).map(([key, value]) => [key, value.length])),
    appRouteFiles: files.app.filter((file) => file.endsWith('/page.tsx')).length,
    stageRouteFiles: stageRouteFiles.length,
    scripts: scriptNames.length,
    checkScripts: checkScripts.length,
    stageCheckScripts: stageCheckScripts.length,
    r8Components: r8Components.length,
    r8DataFiles: r8Data.length,
    r8Scripts: r8Scripts.length,
    publicRouteTokenCount: publicRouteMatches.length,
  },
  topDirectories: {
    components: groupByTopDirectory(files.components, 'src/components'),
    features: groupByTopDirectory(files.features, 'src/features'),
    data: groupByTopDirectory(files.data, 'data'),
  },
  findings,
  decisionMatrix,
  nextActions: [
    '不要继续新增 R8.10/V11。',
    '先把 product route、world core、public index、route guard、checks 合并为更少的核心门禁。',
    '为真实 Preview/Production 准备部署证据，而不是继续增加概念组件。',
    '所有私密/内部路由继续由 middleware 和 route policy 服务端守门。',
  ],
}

const outJson = 'data/world-kernel/world-kernel-architecture-audit-v1.json'
fs.writeFileSync(rel(outJson), `${JSON.stringify(audit, null, 2)}\n`)

const rows = findings.map((item) => `| ${item.id} | ${item.severity} | ${item.area} | ${item.title} | ${item.decision} |`).join('\n')
const matrixRows = decisionMatrix.map((item) => `| ${item.category} | ${item.keep.join('<br>')} | ${item.merge.join('<br>')} | ${item.archive.join('<br>')} | ${item.deleteLater.join('<br>')} |`).join('\n')
const doc = `# World Kernel Architecture Audit v1\n\n本报告冻结当前功能扩张，把项目从“继续加动态宇宙组件”切换到“内核、边界、路由、脚本和生产证据收束”。\n\n## 1. 唯一基线\n\n- 基线包：\`${freezePolicy.baseline.sourcePackage}\`\n- 工作区：\`${freezePolicy.baseline.workspace}\`\n- 状态：\`${freezePolicy.status}\`\n- 原因：${freezePolicy.baseline.reason}\n\n## 2. 审计统计\n\n\`\`\`json\n${JSON.stringify(audit.statistics, null, 2)}\n\`\`\`\n\n## 3. 关键发现\n\n| ID | 严重级别 | 区域 | 发现 | 决策 |\n|---|---|---|---|---|\n${rows}\n\n## 4. 删 / 合 / 留 / 封决策矩阵\n\n| 类别 | Keep | Merge | Archive | Delete Later |\n|---|---|---|---|---|\n${matrixRows}\n\n## 5. 立即执行边界\n\n${freezePolicy.corePrinciples.map((item) => `- ${item}`).join('\n')}\n\n## 6. 下一步\n\n${audit.nextActions.map((item) => `- ${item}`).join('\n')}\n\n## 7. 结论\n\n当前项目不缺更多页面或概念，真正需要的是一个足够稳定、足够简单、足够长期可维护的 World Kernel。短期保留历史阶段文件作为 legacy/reference，但公开入口、路由守门、产品页面和检查门禁必须围绕产品化主路径收束。\n`
fs.writeFileSync(rel('docs/10-development-history/world-kernel/world-kernel-architecture-audit-v1.md'), doc)

const digest = crypto.createHash('sha256').update(JSON.stringify(audit)).digest('hex')
console.log(`World kernel audit generated: ${outJson}`)
console.log(`sha256=${digest}`)

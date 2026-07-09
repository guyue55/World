// 用途：检查本地 RC 摘要
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const summaryPath = 'docs/90-archive/reports/worldos-local-rc-summary-report.json'
const failures = []

function exists(file) {
  return fs.existsSync(rel(file))
}

if (!exists(summaryPath)) failures.push(`缺少本地 RC 汇总报告：${summaryPath}`)

if (failures.length === 0) {
  const report = JSON.parse(fs.readFileSync(rel(summaryPath), 'utf8'))

  if (report.status !== 'local-rc-passed-external-release-blocked') failures.push(`本地 RC 汇总状态不正确：${report.status}`)
  if (!report.localAccess?.baseUrl?.startsWith('http://')) failures.push('本地 RC 汇总缺少局域网 baseUrl')
  if (report.gates?.runtimeSmoke?.status !== 'passed') failures.push('runtime smoke 未通过')
  if (report.gates?.productionCiBuild !== 'passed-before-summary') failures.push('production CI build 未纳入 RC 汇总')
  if (report.gates?.lanSmoke?.status !== 'passed') failures.push('LAN smoke 未通过')
  if (report.gates?.sceneQa?.status !== 'passed') failures.push('Scene QA 未通过')
  if ((report.gates?.lanSmoke?.passedHttpChecks ?? 0) < 20) failures.push('LAN HTTP 检查数量不足')
  if ((report.gates?.lanSmoke?.passedBrowserChecks ?? 0) < 16) failures.push('LAN 浏览器检查数量不足')
  if ((report.gates?.lanSmoke?.passedHomePrimaryCtaChecks ?? 0) < 2) failures.push('首页主 CTA 可见性证据不足')
  if ((report.gates?.lanSmoke?.passedMobileNavigationChecks ?? 0) < 8) failures.push('移动导航可见性证据不足')
  if ((report.gates?.lanSmoke?.passedHomeCoreStatusCardChecks ?? 0) < 2) failures.push('核心状态卡可见性证据不足')
  if ((report.gates?.lanSmoke?.screenshotCount ?? 0) < 10) failures.push('LAN 截图证据不足')
  if ((report.gates?.sceneQa?.routeChecks ?? 0) < 18) failures.push('Scene QA 场景视口证据不足')
  if ((report.gates?.sceneQa?.screenshotCount ?? 0) < 18) failures.push('Scene QA 截图证据不足')
  if (report.gates?.sceneQa?.firstVisitRitual !== true) failures.push('Scene QA 缺少首次进入仪式证据')
  if (report.gates?.sceneQa?.returningVisitor !== true) failures.push('Scene QA 缺少返回访客证据')
  if (report.gates?.sceneQa?.ambientEnvironment !== true) failures.push('Scene QA 缺少空气层证据')
  if (report.gates?.sceneQa?.sceneTransitionShell !== true) failures.push('Scene QA 缺少转场壳证据')
  if (report.gates?.sceneQa?.sceneIdentityBand !== true) failures.push('Scene QA 缺少场景身份带证据')
  if ((report.gates?.sceneQa?.reducedMotionChecks ?? 0) < 9) failures.push('Scene QA reduced-motion 证据不足')
  if ((report.gates?.audit?.high ?? 0) > 0 || (report.gates?.audit?.critical ?? 0) > 0) failures.push('npm audit 存在 high/critical 风险')
  if ((report.gates?.buildArtifacts?.missing ?? []).length > 0) failures.push(`构建产物缺失：${report.gates.buildArtifacts.missing.join(', ')}`)

  for (const key of ['productionLive', 'releaseReady', 'cleanProductionReady']) {
    if (report.releaseStates?.[key] !== false) failures.push(`${key} 在缺少外部证据前必须保持 false`)
  }

  for (const file of [
    report.evidence?.runtimeReport,
    report.evidence?.lanReport,
    report.evidence?.sceneQaReport,
    report.evidence?.auditReport,
    report.evidence?.externalEvidenceTemplate,
    report.evidence?.policy,
  ].filter(Boolean)) {
    if (!exists(file)) failures.push(`汇总报告指向不存在证据：${file}`)
  }
}

if (failures.length > 0) {
  console.error('WorldOS local RC summary check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('WorldOS local RC summary check passed')
